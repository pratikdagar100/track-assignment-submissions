// Small enhancements only: the page is complete without JavaScript.

(function () {
  // Footer year.
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Highlight the "In this guide" entry for the section currently in view.
  // The ids live on the headings, so each heading's section is observed and
  // mapped back to the link for that heading.
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  if (!("IntersectionObserver" in window) || links.length === 0) return;

  var linkFor = new Map();
  links.forEach(function (link) {
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    var section = target.closest("section") || target;
    linkFor.set(section, link);
  });

  var current = null;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var link = linkFor.get(entry.target);
      if (!link) return;
      if (current) current.classList.remove("is-active");
      current = link;
      current.classList.add("is-active");
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });

  linkFor.forEach(function (_link, section) { observer.observe(section); });
})();
