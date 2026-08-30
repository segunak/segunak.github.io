(function () {
  "use strict";

  function hasLabel(element, label) {
    var strong = element.querySelector("strong");
    return strong && strong.textContent.trim() === label;
  }

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
            "Slides are taking longer than expected. Use the PowerPoint link under Resources.";
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
