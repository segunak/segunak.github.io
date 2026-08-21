(function () {
  "use strict";

  function initializeLocalVideoHero(hero) {
    var video = hero.querySelector("[data-local-video]");
    var fallback = hero.querySelector("[data-local-video-fallback]");
    var fallbackSource = fallback && fallback.dataset.src;
    var fallbackRequested = false;
    var frameCallbackPending = false;
    var playAttempt = 0;
    var retryListening = false;

    if (!video || hero.dataset.localVideoReady) {
      return;
    }

    hero.dataset.localVideoReady = "true";
    video.defaultMuted = true;
    video.muted = true;

    function removeRetryListeners() {
      if (!retryListening) {
        return;
      }

      document.removeEventListener("click", retryPlayback);
      document.removeEventListener("keydown", retryPlayback);
      retryListening = false;
    }

    function addRetryListeners() {
      if (retryListening) {
        return;
      }

      document.addEventListener("click", retryPlayback);
      document.addEventListener("keydown", retryPlayback);
      retryListening = true;
    }

    function markPlaying() {
      if (video.paused || video.error) {
        return;
      }

      fallbackRequested = false;
      if (fallback) {
        fallback.hidden = true;
      }
      hero.dataset.localVideoState = "playing";
      removeRetryListeners();
    }

    function confirmPresentedFrame() {
      if (frameCallbackPending) {
        return;
      }

      frameCallbackPending = true;

      if (typeof video.requestVideoFrameCallback === "function") {
        video.requestVideoFrameCallback(function () {
          frameCallbackPending = false;
          markPlaying();
        });
        return;
      }

      if (video.readyState < 2) {
        video.addEventListener(
          "loadeddata",
          function () {
            frameCallbackPending = false;
            confirmPresentedFrame();
          },
          { once: true }
        );
        return;
      }

      window.requestAnimationFrame(function () {
        frameCallbackPending = false;
        markPlaying();
      });
    }

    function revealFallback() {
      if (!fallbackRequested || !fallback || !fallback.naturalWidth) {
        return;
      }

      function showFallback() {
        if (!fallbackRequested) {
          return;
        }

        fallback.hidden = false;
        hero.dataset.localVideoState = "fallback";
      }

      if (typeof fallback.decode === "function") {
        fallback.decode().then(showFallback, showFallback);
      } else {
        showFallback();
      }
    }

    function requestFallback(allowRetry) {
      fallbackRequested = true;

      if (allowRetry) {
        addRetryListeners();
      } else {
        removeRetryListeners();
      }

      if (!fallback || !fallbackSource) {
        hero.dataset.localVideoState = "failed";
        return;
      }

      if (fallback.complete && fallback.naturalWidth) {
        revealFallback();
        return;
      }

      hero.dataset.localVideoState = "fallback-loading";
      fallback.addEventListener("load", revealFallback, { once: true });
      fallback.addEventListener(
        "error",
        function () {
          if (fallbackRequested) {
            hero.dataset.localVideoState = "failed";
          }
        },
        { once: true }
      );

      if (!fallback.getAttribute("src")) {
        fallback.src = fallbackSource;
        fallback.removeAttribute("data-src");
      }
    }

    function handlePlayRejection(error, attempt) {
      if (attempt !== playAttempt) {
        return;
      }

      if (document.visibilityState === "hidden") {
        hero.dataset.localVideoState = "waiting";
        return;
      }

      if (error && error.name === "AbortError") {
        hero.dataset.localVideoState = "loading";
        video.addEventListener("canplay", attemptPlayback, { once: true });
        return;
      }

      requestFallback(!error || error.name !== "NotSupportedError");
    }

    function attemptPlayback() {
      var attempt;
      var playPromise;

      if (document.visibilityState === "hidden" || video.error) {
        return;
      }

      if (!fallbackRequested) {
        hero.dataset.localVideoState = "loading";
      }

      video.defaultMuted = true;
      video.muted = true;
      attempt = ++playAttempt;

      try {
        playPromise = video.play();
      } catch (error) {
        handlePlayRejection(error, attempt);
        return;
      }

      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(confirmPresentedFrame, function (error) {
          handlePlayRejection(error, attempt);
        });
      }
    }

    function retryPlayback(event) {
      if (
        event.type === "keydown" &&
        event.key !== "Enter" &&
        event.key !== " "
      ) {
        return;
      }

      attemptPlayback();
    }

    video.addEventListener("playing", confirmPresentedFrame);
    video.addEventListener("error", function () {
      playAttempt += 1;
      requestFallback(false);
    });

    document.addEventListener("visibilitychange", function () {
      if (
        document.visibilityState === "visible" &&
        video.paused &&
        !video.error &&
        hero.dataset.localVideoState !== "fallback"
      ) {
        attemptPlayback();
      }
    });

    if (video.error) {
      requestFallback(false);
    } else {
      attemptPlayback();
    }
  }

  function initializeLocalVideoHeroes() {
    var heroes = document.querySelectorAll("[data-local-video-hero]");
    Array.prototype.forEach.call(heroes, initializeLocalVideoHero);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLocalVideoHeroes);
  } else {
    initializeLocalVideoHeroes();
  }
})();