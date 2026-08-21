(function () {
  "use strict";

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function getBioText(source) {
    var paragraphs = source.querySelectorAll("p");

    if (!paragraphs.length) {
      return normalizeText(source.textContent);
    }

    return Array.prototype.map
      .call(paragraphs, function (paragraph) {
        return normalizeText(paragraph.textContent);
      })
      .filter(Boolean)
      .join("\n\n");
  }

  function fallbackCopy(value) {
    var textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    var copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }

  function initializeBioCard(card) {
    var source = card.querySelector("[data-bio-copy-source]");
    var copy = card.querySelector("[data-bio-copy]");
    var copyLabel = card.querySelector("[data-bio-copy-label]");
    var status = card.querySelector("[data-bio-copy-status]");

    if (!source || !copy || !copyLabel || !status || card.dataset.bioCopyReady) {
      return;
    }

    var copyResetTimer;

    function resetCopyStatus() {
      window.clearTimeout(copyResetTimer);
      copyLabel.textContent = "Copy";
      status.textContent = "";
    }

    function showCopyStatus(label, announcement) {
      resetCopyStatus();
      copyLabel.textContent = label;
      status.textContent = announcement;
      copyResetTimer = window.setTimeout(resetCopyStatus, 2000);
    }

    copy.addEventListener("click", function () {
      var value = getBioText(source);
      var copyPromise;

      if (navigator.clipboard && window.isSecureContext) {
        copyPromise = navigator.clipboard.writeText(value);
      } else {
        copyPromise = Promise.resolve(fallbackCopy(value));
      }

      copyPromise
        .then(function (copied) {
          if (copied === false) {
            throw new Error("Copy failed");
          }
          showCopyStatus("Copied", "Bio copied");
        })
        .catch(function () {
          showCopyStatus("Copy Failed", "Could not copy. Select the bio text.");
        });
    });

    card.dataset.bioCopyReady = "true";
  }

  function initializeMobileBioDialog(card) {
    var source = card.querySelector("[data-bio-copy-source]");
    var actions = card.querySelector(".bio-card__actions");
    var dialog = document.querySelector("[data-bio-dialog]");
    var dialogContent = dialog && dialog.querySelector("[data-bio-dialog-content]");
    var closeButtons = dialog && dialog.querySelectorAll("[data-bio-dialog-close]");

    if (
      !source ||
      !actions ||
      !dialog ||
      !dialogContent ||
      !closeButtons.length ||
      typeof dialog.showModal !== "function" ||
      card.dataset.bioDialogReady
    ) {
      return;
    }

    var preview = document.createElement("div");
    preview.className = "bio-card__preview talk-card__preview";

    Array.prototype.slice.call(source.querySelectorAll("p"), 0, 2).forEach(function (paragraph) {
      var previewParagraph = document.createElement("p");
      previewParagraph.textContent = normalizeText(paragraph.textContent);
      preview.appendChild(previewParagraph);
    });

    var viewButton = document.createElement("button");
    viewButton.className = "btn btn--primary bio-card__view talk-card__open";
    viewButton.type = "button";
    viewButton.setAttribute("aria-controls", dialog.id);
    viewButton.setAttribute("aria-haspopup", "dialog");

    var viewIcon = document.createElement("i");
    viewIcon.className = "fas fa-expand";
    viewIcon.setAttribute("aria-hidden", "true");
    var viewLabel = document.createElement("span");
    viewLabel.textContent = "View Full Bio";

    viewButton.appendChild(viewIcon);
    viewButton.appendChild(viewLabel);
    source.before(preview);
    actions.prepend(viewButton);

    function closeDialog() {
      dialog.close();
    }

    viewButton.addEventListener("click", function () {
      var dialogArticle = source.cloneNode(true);
      dialogArticle.removeAttribute("data-bio-copy-source");
      dialogArticle.className = "speaking-talk-dialog__article";
      dialogContent.replaceChildren(dialogArticle);
      document.documentElement.classList.add("speaking-talk-dialog-open");
      dialog.showModal();
    });

    closeButtons.forEach(function (closeButton) {
      closeButton.addEventListener("click", closeDialog);
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });

    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("speaking-talk-dialog-open");
      dialogContent.replaceChildren();
      viewButton.focus({ preventScroll: true });
    });

    var desktopQuery = window.matchMedia("(min-width: 768px)");
    var closeOnDesktop = function (event) {
      if (event.matches && dialog.open) {
        closeDialog();
      }
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", closeOnDesktop);
    } else {
      desktopQuery.addListener(closeOnDesktop);
    }

    card.dataset.bioDialogReady = "true";
  }

  function initializeBioCards() {
    var cards = document.querySelectorAll("[data-bio-card]");
    Array.prototype.forEach.call(cards, function (card) {
      initializeBioCard(card);

      if (card.hasAttribute("data-bio-mobile-dialog")) {
        initializeMobileBioDialog(card);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeBioCards);
  } else {
    initializeBioCards();
  }
})();
