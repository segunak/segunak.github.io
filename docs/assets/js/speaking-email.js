(function () {
  "use strict";

  function initializeSpeakingEmail() {
    var email = document.querySelector("[data-speaking-email]");
    var reveal = email && email.querySelector("[data-speaking-email-reveal]");
    var revealLabel = email && email.querySelector("[data-speaking-email-reveal-label]");
    var details = email && email.querySelector("[data-speaking-email-details]");
    var addressText = email && email.querySelector("[data-speaking-email-address]");
    var copy = email && email.querySelector("[data-speaking-email-copy]");
    var copyLabel = email && email.querySelector("[data-speaking-email-copy-label]");
    var status = email && email.querySelector("[data-speaking-email-status]");

    if (
      !email ||
      !reveal ||
      !revealLabel ||
      !details ||
      !addressText ||
      !copy ||
      !copyLabel ||
      !status ||
      email.dataset.speakingEmailReady
    ) {
      return;
    }

    var address = ["segun", ["segunakinyemi", "com"].join(".")].join("@");
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

    reveal.addEventListener("click", function () {
      var shouldShow = email.dataset.speakingEmailRevealed !== "true";

      email.dataset.speakingEmailRevealed = String(shouldShow);
      reveal.setAttribute("aria-pressed", String(shouldShow));
      revealLabel.textContent = shouldShow ? "Hide Email" : "Show Email";
      reveal.setAttribute("aria-label", shouldShow ? "Hide email address" : "Show email address");
      reveal.title = shouldShow ? "Hide email address" : "Show email address";
      addressText.textContent = shouldShow ? address : "Email address hidden";
      copy.disabled = !shouldShow;

      if (shouldShow) {
        addressText.removeAttribute("aria-label");
      } else {
        addressText.setAttribute("aria-label", "Email address hidden");
      }

      if (!shouldShow) {
        resetCopyStatus();
      }
    });

    copy.addEventListener("click", function () {
      var copyPromise;

      if (copy.disabled) {
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        copyPromise = navigator.clipboard.writeText(address);
      } else {
        copyPromise = Promise.resolve(fallbackCopy(address));
      }

      copyPromise
        .then(function (copied) {
          if (copied === false) {
            throw new Error("Copy failed");
          }
          showCopyStatus("Copied", "Email address copied");
        })
        .catch(function () {
          showCopyStatus("Copy Failed", "Could not copy. Select the address.");
        });
    });

    email.dataset.speakingEmailReady = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSpeakingEmail);
  } else {
    initializeSpeakingEmail();
  }
})();
