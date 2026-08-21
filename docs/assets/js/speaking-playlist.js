(function () {
  "use strict";

  function loadYouTubePlayerApi(callback) {
    if (window.YT && typeof window.YT.Player === "function") {
      callback();
      return;
    }

    var previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof previousReady === "function") {
        previousReady();
      }

      callback();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      var script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  }

  function initializeSpeakingPlaylist() {
    var playlist = document.querySelector("[data-speaking-playlist]");
    var iframe = playlist && playlist.querySelector("[data-speaking-playlist-player]");
    var navigation = playlist && playlist.querySelector("[data-speaking-playlist-navigation]");
    var rail = playlist && playlist.querySelector("[data-speaking-playlist-rail]");
    var previous = playlist && playlist.querySelector("[data-speaking-playlist-previous]");
    var next = playlist && playlist.querySelector("[data-speaking-playlist-next]");

    if (!playlist || !iframe || !navigation || !rail || !previous || !next) {
      return;
    }

    var iframeUrl = new URL(iframe.src);
    var playlistId = iframeUrl.searchParams.get("list");
    var featuredVideoId = playlist.dataset.speakingPlaylistFeaturedVideoId;

    if (!playlistId) {
      return;
    }

    iframeUrl.searchParams.set("enablejsapi", "1");
    if (window.location.origin && window.location.origin !== "null") {
      iframeUrl.searchParams.set("origin", window.location.origin);
    }
    iframe.src = iframeUrl.toString();

    var player;
    var activeIndex = -1;
    var featuredVideoApplied = false;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function updateScrollControls() {
      var maximumScroll = rail.scrollWidth - rail.clientWidth;
      previous.disabled = rail.scrollLeft <= 1;
      next.disabled = maximumScroll <= 1 || rail.scrollLeft >= maximumScroll - 1;
    }

    function updateActiveThumbnail(index, scrollIntoView) {
      if (index < 0 || index === activeIndex) {
        return;
      }

      activeIndex = index;
      var thumbnails = rail.querySelectorAll("[data-speaking-playlist-index]");
      var activeThumbnail;

      thumbnails.forEach(function (thumbnail) {
        var isActive = Number(thumbnail.dataset.speakingPlaylistIndex) === index;
        if (isActive) {
          thumbnail.setAttribute("aria-current", "true");
          activeThumbnail = thumbnail;
        } else {
          thumbnail.removeAttribute("aria-current");
        }
      });

      if (scrollIntoView && activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }

    function buildThumbnailRail() {
      var videoIds = player.getPlaylist();

      if (!videoIds || !videoIds.length || rail.children.length) {
        return;
      }

      var videos = videoIds.map(function (videoId, playlistIndex) {
        return {
          id: videoId,
          playlistIndex: playlistIndex,
        };
      });
      var featuredIndex = videoIds.indexOf(featuredVideoId);

      if (featuredIndex > 0) {
        videos.unshift(videos.splice(featuredIndex, 1)[0]);
      }

      videos.forEach(function (video, displayIndex) {
        var thumbnail = document.createElement("button");
        thumbnail.type = "button";
        thumbnail.className = "speaking-playlist__thumbnail";
        thumbnail.dataset.speakingPlaylistIndex = video.playlistIndex;
        thumbnail.setAttribute(
          "aria-label",
          "Play video " + (displayIndex + 1) + " of " + videos.length
        );

        var image = document.createElement("img");
        image.src = "https://i.ytimg.com/vi/" + encodeURIComponent(video.id) + "/mqdefault.jpg";
        image.alt = "";
        image.width = 320;
        image.height = 180;
        image.loading = "lazy";
        image.decoding = "async";
        thumbnail.appendChild(image);

        thumbnail.addEventListener("click", function () {
          player.playVideoAt(video.playlistIndex);
          updateActiveThumbnail(video.playlistIndex, true);
        });

        rail.appendChild(thumbnail);
      });

      navigation.hidden = false;
      updateActiveThumbnail(player.getPlaylistIndex(), false);
      window.requestAnimationFrame(updateScrollControls);
    }

    function applyFeaturedVideo() {
      if (featuredVideoApplied || !featuredVideoId) {
        return;
      }

      var videoIds = player.getPlaylist();
      if (!videoIds || !videoIds.length) {
        return;
      }

      featuredVideoApplied = true;
      var featuredIndex = videoIds.indexOf(featuredVideoId);

      if (featuredIndex < 0) {
        return;
      }

      if (featuredIndex !== player.getPlaylistIndex()) {
        player.cuePlaylist({
          index: featuredIndex,
          list: playlistId,
          listType: "playlist",
        });
      }

      updateActiveThumbnail(featuredIndex, false);
    }

    function moveThumbnailFocus(event) {
      var thumbnail = event.target.closest("[data-speaking-playlist-index]");
      if (!thumbnail) {
        return;
      }

      var thumbnails = Array.prototype.slice.call(
        rail.querySelectorAll("[data-speaking-playlist-index]")
      );
      var currentIndex = thumbnails.indexOf(thumbnail);
      var nextIndex;

      if (event.key === "ArrowLeft") {
        nextIndex = Math.max(0, currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        nextIndex = Math.min(thumbnails.length - 1, currentIndex + 1);
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = thumbnails.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      thumbnails[nextIndex].focus();
    }

    previous.addEventListener("click", function () {
      rail.scrollBy({
        behavior: reducedMotion ? "auto" : "smooth",
        left: -Math.max(rail.clientWidth * 0.8, 160),
      });
    });

    next.addEventListener("click", function () {
      rail.scrollBy({
        behavior: reducedMotion ? "auto" : "smooth",
        left: Math.max(rail.clientWidth * 0.8, 160),
      });
    });

    rail.addEventListener("keydown", moveThumbnailFocus);
    rail.addEventListener("scroll", updateScrollControls, { passive: true });
    window.addEventListener("resize", updateScrollControls);

    loadYouTubePlayerApi(function () {
      player = new window.YT.Player(iframe, {
        events: {
          onReady: function () {
            buildThumbnailRail();
            applyFeaturedVideo();
          },
          onStateChange: function () {
            buildThumbnailRail();
            applyFeaturedVideo();
            updateActiveThumbnail(player.getPlaylistIndex(), true);
          },
        },
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSpeakingPlaylist);
  } else {
    initializeSpeakingPlaylist();
  }
})();
