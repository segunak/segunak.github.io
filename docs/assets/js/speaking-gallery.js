(function () {
  "use strict";

  function buildTitle(itemElement) {
    var title = document.createElement("span");
    title.className = "speaking-gallery__lightbox-title";

    var caption = document.createElement("span");
    caption.className = "speaking-gallery__lightbox-caption";
    caption.textContent = itemElement.dataset.speakingGalleryCaption;
    title.appendChild(caption);

    if (itemElement.dataset.speakingGalleryCredit) {
      var credit = document.createElement("span");
      credit.className = "speaking-gallery__lightbox-credit";

      var creditLabel = document.createTextNode("Photo: ");
      credit.appendChild(creditLabel);

      if (itemElement.dataset.speakingGalleryCreditUrl) {
        var creditLink = document.createElement("a");
        creditLink.href = itemElement.dataset.speakingGalleryCreditUrl;
        creditLink.textContent = itemElement.dataset.speakingGalleryCredit;
        creditLink.className = "mfp-prevent-close";
        creditLink.rel = "noopener noreferrer";
        credit.appendChild(creditLink);
      } else {
        credit.appendChild(document.createTextNode(itemElement.dataset.speakingGalleryCredit));
      }

      title.appendChild(credit);
    }

    return title.outerHTML;
  }

  function getGalleryMonth(itemElement) {
    var match = /^(0[1-9]|1[0-2])-((?:19|20)\d{2})$/.exec(
      itemElement.dataset.speakingGalleryMonth
    );

    return match ? Number(match[2]) * 12 + Number(match[1]) : null;
  }

  function initializeSpeakingGallery() {
    var gallery = document.querySelector("[data-speaking-gallery]");
    var jquery = window.jQuery;
    var dialog = gallery && gallery.querySelector("[data-speaking-gallery-dialog]");
    var allGrid = gallery && gallery.querySelector(".speaking-gallery__all-grid");
    var openAll = gallery && gallery.querySelector("[data-speaking-gallery-open]");
    var closeDialogs = gallery && gallery.querySelectorAll("[data-speaking-gallery-close]");
    var headshotTrigger = document.querySelector("[data-speaking-headshot]");

    if (
      !gallery ||
      !dialog ||
      !allGrid ||
      gallery.dataset.speakingGalleryReady ||
      !jquery ||
      !jquery.magnificPopup
    ) {
      return;
    }

    var itemElements = Array.prototype.slice.call(
      gallery.querySelectorAll("[data-speaking-gallery-item]")
    );
    var featuredTriggers = Array.prototype.slice.call(
      gallery.querySelectorAll("[data-speaking-gallery-trigger]")
    );

    if (!itemElements.length) {
      return;
    }

    itemElements = itemElements
      .map(function (itemElement, index) {
        return {
          element: itemElement,
          index: index,
          month: getGalleryMonth(itemElement),
        };
      })
      .sort(function (left, right) {
        if (left.month === right.month) {
          return left.index - right.index;
        }
        if (left.month === null) {
          return 1;
        }
        if (right.month === null) {
          return -1;
        }
        return right.month - left.month;
      })
      .map(function (item) {
        return item.element;
      });

    itemElements.forEach(function (itemElement) {
      allGrid.appendChild(itemElement.parentElement);
    });

    gallery.dataset.speakingGalleryReady = "true";

    var allItems = itemElements.map(function (itemElement) {
      return {
        download_download: itemElement.dataset.speakingGalleryDownload,
        download_href: itemElement.dataset.speakingGalleryOriginal,
        download_title: "Download original photo",
        "download_aria-label":
          "Download original: " + itemElement.dataset.speakingGalleryCaption,
        file: itemElement.dataset.speakingGalleryFile,
        src: itemElement.href,
        title: buildTitle(itemElement),
      };
    });

    var featuredItems = featuredTriggers
      .map(function (trigger) {
        return allItems.find(function (item) {
          return item.file === trigger.dataset.speakingGalleryFile;
        });
      })
      .filter(Boolean);

    var lightboxScrollPosition = 0;

    function preventLightboxPageScroll(event) {
      event.preventDefault();
    }

    function lockLightboxScroll() {
      lightboxScrollPosition = window.scrollY || window.pageYOffset;
      document.documentElement.classList.add("speaking-gallery-lightbox-open");
      document.body.classList.add("speaking-gallery-lightbox-open");
      document.addEventListener("touchmove", preventLightboxPageScroll, { passive: false });
      document.addEventListener("wheel", preventLightboxPageScroll, { passive: false });
    }

    function unlockLightboxScroll() {
      document.documentElement.classList.remove("speaking-gallery-lightbox-open");
      document.body.classList.remove("speaking-gallery-lightbox-open");
      document.removeEventListener("touchmove", preventLightboxPageScroll);
      document.removeEventListener("wheel", preventLightboxPageScroll);
      window.scrollTo(0, lightboxScrollPosition);
    }

    function openGallery(items, index, returnFocus, reopenDialog, dialogScrollPosition) {
      jquery.magnificPopup.open(
        {
          items: items,
          type: "image",
          tLoading: "Loading image #%curr%...",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
          },
          image: {
            markup:
              '<div class="mfp-figure">' +
              '<a class="mfp-download speaking-gallery__download mfp-prevent-close" href="#" download title="Download original photo" aria-label="Download original photo">' +
              '<i class="fas fa-download" aria-hidden="true"></i>' +
              "</a>" +
              '<div class="mfp-close"></div>' +
              "<figure>" +
              '<div class="mfp-img"></div>' +
              "<figcaption>" +
              '<div class="mfp-bottom-bar">' +
              '<div class="mfp-title"></div>' +
              '<div class="mfp-counter"></div>' +
              "</div>" +
              "</figcaption>" +
              "</figure>" +
              '<button class="speaking-gallery__lightbox-close-action mfp-prevent-close" type="button" data-speaking-gallery-lightbox-close>' +
              '<i class="fas fa-times" aria-hidden="true"></i>' +
              "Close Photo" +
              "</button>" +
              "</div>",
            tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
          },
          removalDelay: 500,
          mainClass: "mfp-zoom-in speaking-gallery-lightbox",
          callbacks: {
            beforeOpen: function () {
              lockLightboxScroll();
              this.st.image.markup = this.st.image.markup.replace(
                "mfp-figure",
                "mfp-figure mfp-with-anim"
              );
            },
            afterClose: function () {
              unlockLightboxScroll();
              if (reopenDialog && typeof dialog.showModal === "function") {
                document.documentElement.classList.add("speaking-gallery-open");
                dialog.showModal();
                allGrid.scrollTop = dialogScrollPosition;
                window.setTimeout(function () {
                  allGrid.scrollTop = dialogScrollPosition;
                  returnFocus.focus({ preventScroll: true });
                  allGrid.scrollTop = dialogScrollPosition;
                }, 100);
              } else if (returnFocus) {
                returnFocus.focus();
              }
            },
          },
          closeOnContentClick: false,
          midClick: true,
        },
        index
      );
    }

    featuredTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        var index = featuredItems.findIndex(function (item) {
          return item.file === trigger.dataset.speakingGalleryFile;
        });

        if (index >= 0) {
          event.preventDefault();
          openGallery(featuredItems, index, trigger);
        }
      });
    });

    if (headshotTrigger) {
      headshotTrigger.addEventListener("click", function (event) {
        var original = headshotTrigger.dataset.speakingHeadshotOriginal;

        event.preventDefault();
        openGallery(
          [
            {
              download_download: headshotTrigger.dataset.speakingHeadshotDownload,
              download_href: original,
              download_title: "Download headshot",
              "download_aria-label": "Download Segun Akinyemi headshot",
              src: original,
              title: "Segun Akinyemi",
            },
          ],
          0,
          headshotTrigger
        );
      });
    }

    itemElements.forEach(function (itemElement, index) {
      itemElement.addEventListener("click", function (event) {
        event.preventDefault();
        var dialogScrollPosition = allGrid.scrollTop;
        dialog.close();
        openGallery(allItems, index, itemElement, true, dialogScrollPosition);
      });
    });

    if (openAll && typeof dialog.showModal === "function") {
      openAll.addEventListener("click", function (event) {
        event.preventDefault();
        document.documentElement.classList.add("speaking-gallery-open");
        dialog.showModal();
      });
    }

    closeDialogs.forEach(function (closeDialog) {
      closeDialog.addEventListener("click", function () {
        dialog.close();
      });
    });

    document.addEventListener("click", function (event) {
      if (event.target.closest("[data-speaking-gallery-lightbox-close]")) {
        event.preventDefault();
        jquery.magnificPopup.close();
      }
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("speaking-gallery-open");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSpeakingGallery);
  } else {
    initializeSpeakingGallery();
  }
})();
