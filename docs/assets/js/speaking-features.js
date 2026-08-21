(function () {
  "use strict";

  var EMBED_TIMEOUT = 15000;

  function initializeSpeakingFeatures() {
    var features = document.querySelector("[data-speaking-features]");
    var dialog = features && features.querySelector("[data-speaking-features-dialog]");
    var openDialog = features && features.querySelector("[data-speaking-features-open]");
    var closeDialogs = features && features.querySelectorAll("[data-speaking-features-close]");
    var allFeatures = features && features.querySelector("[data-speaking-features-all]");

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

    function setFeatureEmbedState(embed, state, labelText) {
      var label = embed.querySelector("[data-feature-embed-label]");
      embed.dataset.featureEmbedState = state;

      if (label && labelText) {
        label.textContent = labelText;
      }
    }

    function activateFeatureEmbed(embed) {
      var iframe;
      var source;
      var timeout;

      if (embed.dataset.featureEmbedState !== "queued") {
        return;
      }

      iframe = embed.querySelector("[data-feature-embed-frame]");
      source = iframe && iframe.dataset.src;

      if (!iframe || !source) {
        setFeatureEmbedState(embed, "failed", "Open Video");
        return;
      }

      setFeatureEmbedState(embed, "loading", "Loading Video");

      iframe.addEventListener(
        "load",
        function () {
          window.clearTimeout(timeout);
          setFeatureEmbedState(embed, "loaded");
        },
        { once: true }
      );

      timeout = window.setTimeout(function () {
        if (embed.dataset.featureEmbedState === "loading") {
          setFeatureEmbedState(embed, "failed", "Open Video");
        }
      }, EMBED_TIMEOUT);

      iframe.src = source;
      iframe.removeAttribute("data-src");
    }

    function activateDeferredContent(element) {
      if (element.hasAttribute("data-linkedin-embed")) {
        activateEmbed(element);
      } else {
        activateFeatureEmbed(element);
      }
    }

    function activateAllDeferredContent() {
      var queuedContent = features.querySelectorAll(
        '[data-linkedin-embed][data-linkedin-state="queued"], ' +
          '[data-feature-embed][data-feature-embed-state="queued"]'
      );

      queuedContent.forEach(activateDeferredContent);
    }

    allFeatures.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-feature-embed-load]");
      var embed = trigger && trigger.closest("[data-feature-embed]");

      if (!embed || embed.dataset.featureEmbedState === "failed") {
        return;
      }

      event.preventDefault();
      activateFeatureEmbed(embed);
    });

    openDialog.addEventListener("click", function () {
      if (typeof dialog.showModal !== "function") {
        return;
      }

      document.documentElement.classList.add("speaking-features-open");
      dialog.showModal();
      activateAllDeferredContent();
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
