(function () {
  "use strict";

  function hasLabel(element, label) {
    var strong = element.querySelector("strong");
    return strong && strong.textContent.trim() === label;
  }

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function getDescriptionParagraphs(article) {
    return Array.prototype.filter.call(article.children, function (element) {
      return (
        element.tagName === "P" &&
        !element.classList.contains("speaking-talk-dialog__subtitle") &&
        !element.classList.contains("speaking-talk-dialog__references") &&
        !hasLabel(element, "Best For:") &&
        !hasLabel(element, "Format:") &&
        !hasLabel(element, "Presented At:") &&
        !hasLabel(element, "Resources:")
      );
    });
  }

  function copyDescription(container) {
    var paragraphs = Array.prototype.slice.call(container.querySelectorAll("p"));
    var plainText = paragraphs
      .map(function (paragraph) {
        return normalizeText(paragraph.textContent);
      })
      .filter(Boolean)
      .join("\n\n");

    var html = paragraphs
      .map(function (paragraph) {
        var clone = paragraph.cloneNode(true);
        clone.querySelectorAll("a[href]").forEach(function (anchor) {
          anchor.setAttribute("href", anchor.href);
        });
        return clone.outerHTML;
      })
      .join("");

    if (
      navigator.clipboard &&
      typeof navigator.clipboard.write === "function" &&
      typeof window.ClipboardItem === "function"
    ) {
      return navigator.clipboard.write([
        new window.ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([plainText], { type: "text/plain" })
        })
      ]);
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(plainText);
    }

    return Promise.reject(new Error("Clipboard unavailable"));
  }

  document.addEventListener("click", function (event) {
    var openButton = event.target.closest(".speaking-talk-dialog__slides [data-open-url]");
    if (openButton) {
      var openDetails = openButton.closest(".speaking-email__details");
      var openAddress = openDetails && openDetails.querySelector(".speaking-email__address");
      if (openAddress && openAddress.href) {
        window.open(openAddress.href, "_blank", "noopener,noreferrer");
      }
      return;
    }

    var descriptionButton = event.target.closest("[data-copy-description]");
    if (descriptionButton) {
      var card = descriptionButton.closest(".bio-card");
      var content = card && card.querySelector(".bio-card__content");
      var status = descriptionButton.nextElementSibling;
      var label = descriptionButton.querySelector("span");
      var icon = descriptionButton.querySelector("i");

      copyDescription(content || document.createElement("div"))
        .then(function () {
          label.textContent = "Copied";
          icon.className = "fas fa-check";
          status.textContent = "Description copied";
        })
        .catch(function () {
          label.textContent = "Copy Failed";
          icon.className = "fas fa-exclamation-triangle";
          status.textContent = "Copy failed. Select the description to copy it.";
        });
      return;
    }

    var button = event.target.closest(".speaking-talk-dialog__slides [data-copy-url]");
    if (!button) {
      return;
    }

    var details = button.closest(".speaking-email__details");
    var address = details && details.querySelector(".speaking-email__address");
    var status = button.nextElementSibling;
    var label = button.querySelector("span");
    var icon = button.querySelector("i");
    var copyPromise =
      navigator.clipboard && address
        ? navigator.clipboard.writeText(address.href)
        : Promise.reject(new Error("Clipboard unavailable"));

    copyPromise
      .then(function () {
        label.textContent = "Copied";
        icon.className = "fas fa-check";
        status.textContent = "Slide URL copied";
      })
      .catch(function () {
        label.textContent = "Copy Failed";
        icon.className = "fas fa-exclamation-triangle";
        status.textContent = "Copy failed. Select the URL to copy it.";
      });
  });

  function initializeTalkCards() {
    var cards = document.querySelectorAll(".talk-card");
    var dialog = document.querySelector("[data-speaking-talk-dialog]");
    var dialogContent = dialog && dialog.querySelector("[data-speaking-talk-dialog-content]");
    var dialogTitle = dialog && dialog.querySelector("#speaking-talk-dialog-title");
    var closeButtons = dialog && dialog.querySelectorAll("[data-speaking-talk-dialog-close]");
    var talksById = Object.create(null);
    var activeTrigger = null;
    var activeTalkId = null;
    var slideLoadTimers = [];

    if (
      !cards.length ||
      !dialog ||
      !dialogContent ||
      !dialogTitle ||
      !closeButtons ||
      typeof dialog.showModal !== "function"
    ) {
      return;
    }

    function createTalkTemplate(card) {
      var template = document.createElement("template");

      Array.prototype.slice.call(card.childNodes).forEach(function (node) {
        template.content.appendChild(node.cloneNode(true));
      });

      return template;
    }

    function clearSlideLoadTimers() {
      slideLoadTimers.forEach(function (timer) {
        window.clearTimeout(timer);
      });
      slideLoadTimers = [];
    }

    function loadTalkSlides(dialogCard) {
      clearSlideLoadTimers();

      dialogCard.querySelectorAll("[data-speaking-talk-slides-iframe]").forEach(function (iframe) {
        var frame = iframe.closest(".speaking-talk-dialog__slides-frame");
        var source = iframe.getAttribute("data-speaking-talk-slides-src");

        if (!frame || !source) {
          return;
        }

        var status = document.createElement("div");
        status.className = "speaking-talk-dialog__slides-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");

        var spinner = document.createElement("span");
        spinner.className = "speaking-talk-dialog__slides-spinner";
        spinner.setAttribute("aria-hidden", "true");

        var statusText = document.createElement("span");
        statusText.textContent = "Loading slides.";

        status.appendChild(spinner);
        status.appendChild(statusText);
        frame.prepend(status);
        iframe.setAttribute("aria-hidden", "true");
        iframe.setAttribute("tabindex", "-1");

        var timer = window.setTimeout(function () {
          spinner.hidden = true;
          statusText.textContent =
            "Slides are taking longer than expected. Use the presentation link under Resources.";
        }, 12000);
        slideLoadTimers.push(timer);

        iframe.addEventListener(
          "load",
          function () {
            window.clearTimeout(timer);
            status.hidden = true;
            frame.classList.add("speaking-talk-dialog__slides-frame--loaded");
            iframe.removeAttribute("aria-hidden");
            iframe.removeAttribute("tabindex");
          },
          { once: true }
        );

        iframe.setAttribute("src", source);
      });
    }

    function openTalkDialog(talkTemplate, trigger, talkId, updateHash) {
      var dialogCard = document.createElement("article");
      dialogCard.appendChild(talkTemplate.content.cloneNode(true));
      var titleElement = dialogCard.querySelector(".talk-card__title");
      var dialogChildren = Array.prototype.slice.call(dialogCard.children);
      var bestFor = dialogChildren.find(function (element) {
        return element.tagName === "P" && hasLabel(element, "Best For:");
      });
      var format = dialogChildren.find(function (element) {
        return element.tagName === "P" && hasLabel(element, "Format:");
      });
      var formatIndex = dialogChildren.indexOf(format);
      var description = dialogChildren.slice(formatIndex + 1).find(function (element) {
        return element.tagName === "P";
      });
      var bestForIndex = dialogChildren.indexOf(bestFor);
      var subtitleParagraph = dialogChildren.find(function (element, index) {
        return (
          element.tagName === "P" &&
          element.querySelector("em") &&
          (bestForIndex < 0 || index < bestForIndex)
        );
      });

      dialogTitle.textContent = titleElement ? titleElement.textContent : "Talk Details";
      if (titleElement) {
        titleElement.remove();
      }

      if (subtitleParagraph) {
        subtitleParagraph.classList.add("speaking-talk-dialog__subtitle");
      }

      if (bestFor || format) {
        var metadata = document.createElement("div");
        metadata.className = "speaking-talk-dialog__meta";
        (bestFor || format).before(metadata);

        if (bestFor) {
          metadata.appendChild(bestFor);
        }
        if (format) {
          metadata.appendChild(format);
        }
      }

      if (description) {
        var descriptionHeading = document.createElement("div");
        descriptionHeading.className = "speaking-talk-dialog__section-heading";
        descriptionHeading.textContent = "Description";
        description.before(descriptionHeading);

        var descriptionParagraphs = getDescriptionParagraphs(dialogCard);
        var descriptionCard = document.createElement("div");
        descriptionCard.className = "bio-card";

        var descriptionContent = document.createElement("div");
        descriptionContent.className = "bio-card__content";

        descriptionHeading.after(descriptionCard);
        descriptionParagraphs.forEach(function (paragraph) {
          descriptionContent.appendChild(paragraph);
        });

        var descriptionActions = document.createElement("div");
        descriptionActions.className = "bio-card__actions";

        var copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "btn btn--primary bio-card__copy";
        copyButton.setAttribute("data-copy-description", "");

        var copyIcon = document.createElement("i");
        copyIcon.className = "fas fa-copy";
        copyIcon.setAttribute("aria-hidden", "true");

        var copyLabel = document.createElement("span");
        copyLabel.textContent = "Copy";

        var copyStatus = document.createElement("span");
        copyStatus.className = "bio-card__status";
        copyStatus.setAttribute("role", "status");
        copyStatus.setAttribute("aria-live", "polite");

        copyButton.appendChild(copyIcon);
        copyButton.appendChild(copyLabel);
        descriptionActions.appendChild(copyButton);
        descriptionActions.appendChild(copyStatus);
        descriptionCard.appendChild(descriptionContent);
        descriptionCard.appendChild(descriptionActions);
      }

      Array.prototype.slice.call(dialogCard.children).forEach(function (element) {
        if (
          element.tagName === "P" &&
          (hasLabel(element, "Presented At:") || hasLabel(element, "Resources:"))
        ) {
          element.classList.add("speaking-talk-dialog__references");
        }
      });

      dialogCard
        .querySelectorAll(
          ".speaking-talk-dialog__meta strong, .speaking-talk-dialog__references > strong"
        )
        .forEach(function (label) {
          label.textContent = label.textContent.replace(/:\s*$/, "");
        });

      dialogCard
        .querySelectorAll(".speaking-talk-dialog__slides-url .speaking-email__details")
        .forEach(function (details) {
          var address = details.querySelector(".speaking-email__address");
          var copyBtn = details.querySelector("[data-copy-url]");

          if (!address || !copyBtn || details.querySelector("[data-open-url]")) {
            return;
          }

          var openButton = document.createElement("button");
          openButton.type = "button";
          openButton.className = "btn btn--primary speaking-email__copy";
          openButton.setAttribute("data-open-url", "");
          openButton.setAttribute("aria-label", "Open slides in new tab");
          openButton.setAttribute("title", "Open slides in new tab");

          var openIcon = document.createElement("i");
          openIcon.className = "fas fa-external-link-alt";
          openIcon.setAttribute("aria-hidden", "true");

          var openLabel = document.createElement("span");
          openLabel.className = "speaking-email__button-label";
          openLabel.textContent = "Open";

          openButton.appendChild(openIcon);
          openButton.appendChild(openLabel);
          copyBtn.before(openButton);
        });

      dialogCard.className = "speaking-talk-dialog__article";
      dialogContent.replaceChildren(dialogCard);
      loadTalkSlides(dialogCard);
      activeTrigger = trigger;
      activeTalkId = talkId;
      document.documentElement.classList.add("speaking-talk-dialog-open");

      if (!dialog.open) {
        dialog.showModal();
      }

      if (updateHash && talkId && location.hash !== "#" + talkId) {
        history.replaceState(history.state, "", "#" + talkId);
      }

      dialogContent.scrollTop = 0;
      window.requestAnimationFrame(function () {
        dialogContent.scrollTop = 0;
      });
      window.dispatchEvent(new Event("resize"));
    }

    closeButtons.forEach(function (closeButton) {
      closeButton.addEventListener("click", function () {
        dialog.close();
      });
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", function () {
      var closedTalkId = activeTalkId;

      clearSlideLoadTimers();
      document.documentElement.classList.remove("speaking-talk-dialog-open");
      dialogContent.replaceChildren();
      activeTalkId = null;

      if (closedTalkId && location.hash === "#" + closedTalkId) {
        history.replaceState(history.state, "", location.pathname + location.search);
      }

      if (activeTrigger) {
        activeTrigger.focus({ preventScroll: true });
        activeTrigger = null;
      }
    });

    cards.forEach(function (card) {
      if (card.dataset.talkCardReady) {
        return;
      }

      var talkId = card.id;
      var talkTemplate = createTalkTemplate(card);
      var children = Array.prototype.slice.call(card.children);
      var formatIndex = children.findIndex(function (element) {
        return element.tagName === "P" && hasLabel(element, "Format:");
      });
      var description = children.slice(formatIndex + 1).find(function (element) {
        return element.tagName === "P";
      });

      if (formatIndex < 0 || !description || !description.nextSibling) {
        return;
      }

      var preview = description.cloneNode(true);
      preview.removeAttribute("id");
      var previewLabel = document.createElement("strong");
      previewLabel.textContent = "Description: ";
      preview.insertBefore(previewLabel, preview.firstChild);
      preview.classList.add("talk-card__preview");
      description.before(preview);

      var details = document.createElement("div");
      details.className = "talk-card__details";

      while (preview.nextSibling) {
        details.appendChild(preview.nextSibling);
      }

      var actions = document.createElement("p");
      actions.className = "talk-card__actions";

      var button = document.createElement("button");
      button.className = "btn btn--primary talk-card__open";
      button.type = "button";
      button.setAttribute("aria-controls", dialog.id);
      button.setAttribute("aria-haspopup", "dialog");

      var icon = document.createElement("i");
      icon.className = "fas fa-expand";
      icon.setAttribute("aria-hidden", "true");
      var label = document.createElement("span");
      label.textContent = "View Details";

      button.appendChild(icon);
      button.appendChild(label);
      actions.appendChild(button);
      preview.after(details);
      details.after(actions);

      button.addEventListener("click", function () {
        openTalkDialog(talkTemplate, button, talkId, true);
      });

      details.hidden = true;
      card.dataset.talkCardReady = "true";

      if (talkId) {
        talksById[talkId] = {
          template: talkTemplate,
          trigger: button,
        };
      }
    });

    function openTalkFromHash() {
      var talkId = location.hash.replace(/^#/, "");
      var talk = talksById[talkId];

      if (talk) {
        if (!dialog.open || activeTalkId !== talkId) {
          openTalkDialog(talk.template, talk.trigger, talkId, false);
        }
      } else if (dialog.open && activeTalkId) {
        dialog.close();
      }
    }

    openTalkFromHash();
    window.addEventListener("hashchange", openTalkFromHash);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTalkCards);
  } else {
    initializeTalkCards();
  }
})();
