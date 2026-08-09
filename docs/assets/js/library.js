/* =========================================================================
   Library page behavior: tab switching, hash routing, quote-grid sorter.
   Used by /library/ via _pages/library.md.
   ========================================================================= */

(function () {
  'use strict';

  // ---- Quote grid sort ---------------------------------------------------

  /*
    Sorts blockquotes inside .quote-container by character length so that
    similarly sized quotes sit next to each other in the 2-column grid.
    Long quotes and the final unpaired normal quote span both columns.
    Migrated verbatim (in spirit) from the inline script that used to live
    in _posts/2022-06-21-favorite-quotes.md.
  */
  const FULL_ROW_QUOTE_LENGTH = 750;
  const LONG_QUOTE_CLASS = 'quote-container__quote--long';
  const ODD_QUOTE_CLASS = 'quote-container__quote--odd';

  function sortQuoteContainer() {
    const quoteContainer = document.querySelector('.quote-container');
    if (!quoteContainer) return;

    const blockquotes = Array.from(quoteContainer.querySelectorAll('blockquote'));
    const normalQuotes = [];

    blockquotes.sort((a, b) => a.innerText.length - b.innerText.length);
    blockquotes.forEach(blockquote => {
      const quoteIsLong = blockquote.innerText.length >= FULL_ROW_QUOTE_LENGTH;

      blockquote.classList.remove(LONG_QUOTE_CLASS, ODD_QUOTE_CLASS);
      blockquote.classList.toggle(LONG_QUOTE_CLASS, quoteIsLong);

      if (!quoteIsLong) {
        normalQuotes.push(blockquote);
      }
    });

    if (normalQuotes.length % 2 !== 0) {
      normalQuotes[normalQuotes.length - 1].classList.add(ODD_QUOTE_CLASS);
    }

    blockquotes.forEach(blockquote => quoteContainer.appendChild(blockquote));
  }

  // Expose for console debugging if needed
  window.sortQuoteContainer = sortQuoteContainer;

  // ---- Tabs --------------------------------------------------------------

  const TABS_SELECTOR = '.library-tabs';
  const BOOKS_SUB_ANCHORS = [
    'books-currently-reading',
    'books-to-read',
    'books-read',
    'books-literature'
  ];

  function activateTab(tabBtn, tabBtns, panels, opts) {
    opts = opts || {};
    const targetId = tabBtn.getAttribute('aria-controls');

    tabBtns.forEach(btn => {
      const selected = btn === tabBtn;
      btn.setAttribute('aria-selected', selected ? 'true' : 'false');
      btn.setAttribute('tabindex', selected ? '0' : '-1');
    });

    panels.forEach(panel => {
      const isTarget = panel.id === targetId;
      panel.hidden = !isTarget;
      if (isTarget) {
        // Re-trigger the fade animation on each activation
        panel.style.animation = 'none';
        // eslint-disable-next-line no-unused-expressions
        panel.offsetHeight; // reflow
        panel.style.animation = '';
      }
    });

    if (opts.focus) tabBtn.focus();

    if (opts.updateHash) {
      const tabKey = targetId.replace(/^library-panel-/, '');
      const newHash = '#' + tabKey;
      if (location.hash !== newHash) {
        // Use replaceState to avoid scroll-jump and to keep history clean
        history.replaceState(null, '', newHash);
      }
    }
  }

  function setupTabs() {
    const tabList = document.querySelector(TABS_SELECTOR);
    if (!tabList) return;

    const tabBtns = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
    if (tabBtns.length === 0 || panels.length === 0) return;

    // Click handlers
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        activateTab(btn, tabBtns, panels, { updateHash: true });
      });
    });

    // Keyboard nav: Left/Right cycle, Home/End jump to ends
    tabList.addEventListener('keydown', function (e) {
      const currentIdx = tabBtns.findIndex(b => b === document.activeElement);
      if (currentIdx === -1) return;

      let nextIdx = null;
      if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % tabBtns.length;
      else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + tabBtns.length) % tabBtns.length;
      else if (e.key === 'Home') nextIdx = 0;
      else if (e.key === 'End') nextIdx = tabBtns.length - 1;

      if (nextIdx !== null) {
        e.preventDefault();
        activateTab(tabBtns[nextIdx], tabBtns, panels, { updateHash: true, focus: true });
      }
    });

    // Hash router: figure out which tab to show on load and on hashchange
    function applyHash(scrollToSubAnchor) {
      const raw = (location.hash || '').replace(/^#/, '');
      let tabKey = 'books'; // default
      let subAnchorId = null;

      if (raw === 'quotes') {
        tabKey = 'quotes';
      } else if (raw === 'books') {
        tabKey = 'books';
      } else if (BOOKS_SUB_ANCHORS.indexOf(raw) !== -1) {
        tabKey = 'books';
        subAnchorId = raw;
      }

      const targetBtn = tabBtns.find(b => b.getAttribute('aria-controls') === 'library-panel-' + tabKey);
      if (targetBtn) {
        activateTab(targetBtn, tabBtns, panels, { updateHash: false });
      }

      if (subAnchorId && scrollToSubAnchor) {
        // Defer to next frame so the panel is visible before we scroll
        requestAnimationFrame(function () {
          const target = document.getElementById(subAnchorId);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }

    applyHash(true);
    window.addEventListener('hashchange', function () { applyHash(true); });
  }

  // ---- Bootstrap ---------------------------------------------------------

  document.addEventListener('DOMContentLoaded', function () {
    sortQuoteContainer();
    setupTabs();
  });
})();
