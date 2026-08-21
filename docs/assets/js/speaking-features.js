(function () {
  "use strict";

  var EMBED_BATCH_SIZE = 2;
  var EMBED_BATCH_DELAY = 400;
  var EMBED_TIMEOUT = 15000;

  function initializeSpeakingFeatures() {
    var features = document.querySelector("[data-speaking-features]");
    var dialog = features && features.querySelector("[data-speaking-features-dialog]");
    var openDialog = features && features.querySelector("[data-speaking-features-open]");
    var closeDialogs = features && features.querySelectorAll("[data-speaking-features-close]");
    var allFeatures = features && features.querySelector("[data-speaking-features-all]");
    var batchTimer;
    var backgroundLoadingStarted = false;

    if (
      !features ||
      !dialog ||
      !openDialog ||
      !closeDialogs ||
      !allFeatures ||
      features.dataset.speakingFeaturesReady
    ) {
      return;
    }

    function setEmbedState(embed, state, statusText) {
      var status = embed.querySelector("[data-linkedin-status]");
      embed.dataset.linkedinState = state;

      if (status && statusText) {
        status.textContent = statusText;
      }
    }

    function activateEmbed(embed) {
      var iframe;
      var source;
      var fallback;
      var timeout;

      if (embed.dataset.linkedinState !== "queued") {
        return;
      }

      iframe = embed.querySelector("[data-linkedin-frame]");
      source = iframe && iframe.dataset.src;
      fallback = embed.querySelector("[data-linkedin-fallback]");

      if (!iframe || !source || !fallback) {
        setEmbedState(embed, "failed");
        if (fallback) {
          fallback.hidden = false;
        }
        return;
      }

      setEmbedState(embed, "loading", "Loading LinkedIn post");

      iframe.addEventListener(
        "load",
        function () {
          window.clearTimeout(timeout);

          if (embed.dataset.linkedinState === "loading") {
            setEmbedState(embed, "loaded");
          }
        },
        { once: true }
      );

      timeout = window.setTimeout(function () {
        if (embed.dataset.linkedinState !== "loading") {
          return;
        }

        setEmbedState(embed, "failed");
        fallback.hidden = false;
      }, EMBED_TIMEOUT);

      iframe.src = source;
      iframe.removeAttribute("data-src");
    }

    function loadNextEmbedBatch() {
      var queuedEmbeds = Array.prototype.slice.call(
        features.querySelectorAll('[data-linkedin-embed][data-linkedin-state="queued"]'),
        0,
        EMBED_BATCH_SIZE
      );

      queuedEmbeds.forEach(activateEmbed);

      if (
        features.querySelector('[data-linkedin-embed][data-linkedin-state="queued"]')
      ) {
        batchTimer = window.setTimeout(loadNextEmbedBatch, EMBED_BATCH_DELAY);
      }
    }

    function startBackgroundEmbedLoading() {
      if (backgroundLoadingStarted) {
        return;
      }

      backgroundLoadingStarted = true;
      loadNextEmbedBatch();
    }

    function prioritizeRemainingEmbeds() {
      window.clearTimeout(batchTimer);
      features
        .querySelectorAll('[data-linkedin-embed][data-linkedin-state="queued"]')
        .forEach(activateEmbed);
    }

    if (document.readyState === "complete") {
      window.setTimeout(startBackgroundEmbedLoading, 0);
    } else {
      window.addEventListener("load", startBackgroundEmbedLoading, { once: true });
    }

    openDialog.addEventListener("click", function () {
      if (typeof dialog.showModal !== "function") {
        return;
      }

      prioritizeRemainingEmbeds();
      document.documentElement.classList.add("speaking-features-open");
      dialog.showModal();
      window.dispatchEvent(new Event("resize"));
    });

    closeDialogs.forEach(function (closeDialog) {
      closeDialog.addEventListener("click", function () {
        dialog.close();
      });
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("speaking-features-open");
      openDialog.focus({ preventScroll: true });
    });

    features.dataset.speakingFeaturesReady = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSpeakingFeatures);
  } else {
    initializeSpeakingFeatures();
  }
})();
