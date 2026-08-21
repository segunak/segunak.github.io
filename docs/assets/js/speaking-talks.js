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
    var activeTrigger = null;

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

    function openTalkDialog(fullContent, trigger) {
      var dialogCard = fullContent.cloneNode(true);
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

      dialogCard.removeAttribute("markdown");
      dialogCard.className = "speaking-talk-dialog__article";
      dialogContent.replaceChildren(dialogCard);
      activeTrigger = trigger;
      document.documentElement.classList.add("speaking-talk-dialog-open");
      dialog.showModal();
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
      document.documentElement.classList.remove("speaking-talk-dialog-open");
      dialogContent.replaceChildren();

      if (activeTrigger) {
        activeTrigger.focus({ preventScroll: true });
        activeTrigger = null;
      }
    });

    cards.forEach(function (card) {
      if (card.dataset.talkCardReady) {
        return;
      }

      var fullContent = card.cloneNode(true);
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
        openTalkDialog(fullContent, button);
      });

      details.hidden = true;
      card.dataset.talkCardReady = "true";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTalkCards);
  } else {
    initializeTalkCards();
  }
})();
