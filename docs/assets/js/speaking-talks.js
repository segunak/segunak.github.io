(function () {
  "use strict";

  function hasLabel(element, label) {
    var strong = element.querySelector("strong");
    return strong && strong.textContent.trim() === label;
  }

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function slugifyVersion(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function isDescriptionParagraph(element) {
    return (
      element.tagName === "P" &&
      !element.classList.contains("speaking-talk-dialog__subtitle") &&
      !element.classList.contains("speaking-talk-dialog__references") &&
      !hasLabel(element, "Best For:") &&
      !hasLabel(element, "Format:") &&
      !hasLabel(element, "Presented At:") &&
      !hasLabel(element, "Resources:")
    );
  }

  function getDescriptionParagraphs(article) {
    return Array.prototype.filter.call(article.children, function (element) {
      return isDescriptionParagraph(element);
    });
  }

  function getVersionElements(container) {
    return Array.prototype.filter.call(container.children, function (element) {
      return element.classList && element.classList.contains("talk-card__version");
    });
  }

  function getVersionMeta(versionElement, talkId, index) {
    var label =
      normalizeText(versionElement.getAttribute("data-talk-version-label") || "") ||
      "Version " + (index + 1);
    var explicitId = normalizeText(versionElement.getAttribute("id") || "");
    var explicitKey = slugifyVersion(versionElement.getAttribute("data-talk-version") || "");
    var fallbackSlug = explicitKey || slugifyVersion(label) || String(index + 1);
    var hashId = explicitId || (talkId ? talkId + "--" + fallbackSlug : "");

    return {
      label: label,
      hashId: hashId
    };
  }

  function resetCopyButton(card) {
    if (!card) {
      return;
    }

    var button = card.querySelector("[data-copy-description]");
    var status = button && button.nextElementSibling;
    var label = button && button.querySelector("span");
    var icon = button && button.querySelector("i");

    if (label) {
      label.textContent = "Copy";
    }
    if (icon) {
      icon.className = "fas fa-copy";
    }
    if (status) {
      status.textContent = "";
    }
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
      var activePanel =
        card && card.querySelector(".speaking-talk-dialog__panel:not([hidden])");
      var content = activePanel || (card && card.querySelector(".bio-card__content"));
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
    var hashTargets = Object.create(null);
    var activeTrigger = null;
    var activeTalkId = null;
    var activeSelectVersion = null;
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

    function createDescriptionActions() {
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

      return descriptionActions;
    }

    function openTalkDialog(talkTemplate, trigger, talkId, initialVersionIndex, updateHash) {
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
      var versionElements = getVersionElements(dialogCard);
      var bestForIndex = dialogChildren.indexOf(bestFor);
      var subtitleParagraph = dialogChildren.find(function (element, index) {
        return (
          element.tagName === "P" &&
          element.querySelector("em") &&
          (bestForIndex < 0 || index < bestForIndex)
        );
      });

      if (versionElements.length === 1) {
        while (versionElements[0].firstChild) {
          versionElements[0].before(versionElements[0].firstChild);
        }
        versionElements[0].remove();
        versionElements = [];
        dialogChildren = Array.prototype.slice.call(dialogCard.children);
      }

      var description =
        versionElements[0] ||
        dialogChildren.slice(formatIndex + 1).find(function (element) {
          return isDescriptionParagraph(element);
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

      activeSelectVersion = null;

      if (versionElements.length >= 2) {
        var tabbedHeading = document.createElement("div");
        tabbedHeading.className = "speaking-talk-dialog__section-heading";
        tabbedHeading.textContent = "Description";
        versionElements[0].before(tabbedHeading);

        var tabbedCard = document.createElement("div");
        tabbedCard.className = "bio-card bio-card--tabbed";
        tabbedHeading.after(tabbedCard);

        var tabList = document.createElement("div");
        tabList.className = "speaking-talk-dialog__tabs";
        tabList.setAttribute("role", "tablist");
        tabList.setAttribute("aria-label", "Description versions");

        var tabbedContent = document.createElement("div");
        tabbedContent.className = "bio-card__content";

        var tabButtons = [];
        var tabPanels = [];
        var versionMetas = [];

        versionElements.forEach(function (versionElement, index) {
          var meta = getVersionMeta(versionElement, talkId, index);
          versionMetas.push(meta);

          var tabButton = document.createElement("button");
          tabButton.type = "button";
          tabButton.className = "speaking-talk-dialog__tab";
          tabButton.id = "speaking-talk-dialog-tab-" + index;
          tabButton.setAttribute("role", "tab");
          tabButton.setAttribute("aria-controls", "speaking-talk-dialog-panel-" + index);
          tabButton.textContent = meta.label;

          var panel = document.createElement("div");
          panel.className = "speaking-talk-dialog__panel";
          panel.id = "speaking-talk-dialog-panel-" + index;
          panel.setAttribute("role", "tabpanel");
          panel.setAttribute("aria-labelledby", tabButton.id);

          while (versionElement.firstChild) {
            panel.appendChild(versionElement.firstChild);
          }
          versionElement.remove();

          tabButtons.push(tabButton);
          tabPanels.push(panel);
          tabList.appendChild(tabButton);
          tabbedContent.appendChild(panel);
        });

        function selectVersion(targetIndex, options) {
          var opts = options || {};
          var safeIndex =
            targetIndex >= 0 && targetIndex < tabButtons.length ? targetIndex : 0;

          tabButtons.forEach(function (btn, idx) {
            var isSelected = idx === safeIndex;
            btn.setAttribute("aria-selected", isSelected ? "true" : "false");
            btn.setAttribute("tabindex", isSelected ? "0" : "-1");
          });

          tabPanels.forEach(function (panel, idx) {
            var isSelected = idx === safeIndex;
            panel.hidden = !isSelected;
            if (isSelected && opts.animate) {
              panel.style.animation = "none";
              void panel.offsetHeight;
              panel.style.animation = "";
            }
          });

          resetCopyButton(tabbedCard);

          if (opts.focus) {
            tabButtons[safeIndex].focus();
          }

          if (opts.updateHash && talkId) {
            var targetHash =
              safeIndex === 0 || !versionMetas[safeIndex].hashId
                ? "#" + talkId
                : "#" + versionMetas[safeIndex].hashId;
            if (location.hash !== targetHash) {
              history.replaceState(history.state, "", targetHash);
            }
          }
        }

        tabButtons.forEach(function (btn, index) {
          btn.addEventListener("click", function () {
            selectVersion(index, { updateHash: true, animate: true });
          });
        });

        tabList.addEventListener("keydown", function (event) {
          var currentIndex = tabButtons.indexOf(document.activeElement);
          if (currentIndex < 0) {
            return;
          }

          var nextIndex = null;
          if (event.key === "ArrowRight") {
            nextIndex = (currentIndex + 1) % tabButtons.length;
          } else if (event.key === "ArrowLeft") {
            nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
          } else if (event.key === "Home") {
            nextIndex = 0;
          } else if (event.key === "End") {
            nextIndex = tabButtons.length - 1;
          }

          if (nextIndex !== null) {
            event.preventDefault();
            selectVersion(nextIndex, { updateHash: true, focus: true, animate: true });
          }
        });

        tabbedCard.appendChild(tabList);
        tabbedCard.appendChild(tabbedContent);
        tabbedCard.appendChild(createDescriptionActions());

        selectVersion(initialVersionIndex || 0, { updateHash: false, animate: false });
        activeSelectVersion = selectVersion;
      } else if (description) {
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

        descriptionCard.appendChild(descriptionContent);
        descriptionCard.appendChild(createDescriptionActions());
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

      if (updateHash && talkId) {
        var desiredHash = "#" + talkId;
        if (location.hash !== desiredHash) {
          history.replaceState(history.state, "", desiredHash);
        }
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
      var currentHashKey = location.hash.replace(/^#/, "");
      var matchedTarget = hashTargets[currentHashKey];

      clearSlideLoadTimers();
      document.documentElement.classList.remove("speaking-talk-dialog-open");
      dialogContent.replaceChildren();
      activeTalkId = null;
      activeSelectVersion = null;

      if (closedTalkId && matchedTarget && matchedTarget.talkId === closedTalkId) {
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
      var versionElements = getVersionElements(card);
      var descriptionAnchor =
        versionElements[0] ||
        children.slice(formatIndex + 1).find(function (element) {
          return isDescriptionParagraph(element);
        });
      var firstDescriptionParagraph = versionElements[0]
        ? versionElements[0].querySelector("p")
        : descriptionAnchor;

      if (
        formatIndex < 0 ||
        !descriptionAnchor ||
        !firstDescriptionParagraph ||
        !descriptionAnchor.nextSibling
      ) {
        return;
      }

      var preview = firstDescriptionParagraph.cloneNode(true);
      preview.removeAttribute("id");
      var previewLabel = document.createElement("strong");
      previewLabel.textContent = "Description: ";
      preview.insertBefore(previewLabel, preview.firstChild);
      preview.classList.add("talk-card__preview");
      descriptionAnchor.before(preview);

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
        openTalkDialog(talkTemplate, button, talkId, 0, true);
      });

      details.hidden = true;
      card.dataset.talkCardReady = "true";

      if (talkId) {
        var talkRecord = {
          talkId: talkId,
          template: talkTemplate,
          trigger: button
        };
        talksById[talkId] = talkRecord;
        hashTargets[talkId] = {
          talkId: talkId,
          talk: talkRecord,
          versionIndex: 0
        };

        if (versionElements.length >= 2) {
          versionElements.forEach(function (versionElement, index) {
            var meta = getVersionMeta(versionElement, talkId, index);
            if (meta.hashId) {
              hashTargets[meta.hashId] = {
                talkId: talkId,
                talk: talkRecord,
                versionIndex: index
              };
            }
          });
        }
      }
    });

    function openTalkFromHash() {
      var hashKey = location.hash.replace(/^#/, "");
      var target = hashTargets[hashKey];

      if (target) {
        if (!dialog.open || activeTalkId !== target.talkId) {
          openTalkDialog(
            target.talk.template,
            target.talk.trigger,
            target.talkId,
            target.versionIndex,
            false
          );
        } else if (activeSelectVersion) {
          activeSelectVersion(target.versionIndex, { updateHash: false, animate: true });
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
