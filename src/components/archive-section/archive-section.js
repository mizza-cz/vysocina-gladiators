(() => {
  const grid = document.querySelector(".archive-section__wrapper");
  const btn = document.querySelector(".js-loadMore");
  if (!grid || !btn) return;

  const source = window.archiveLoadMoreSource || btn.dataset.source;
  if (!source) return;

  let loading = false;

  const setLoading = (state) => {
    loading = state;
    btn.classList.toggle("is-loading", state);
    btn.setAttribute("aria-busy", state ? "true" : "false");
    btn.style.pointerEvents = state ? "none" : "";
  };

  const parseHtmlChildren = (html) => {
    const range = document.createRange();
    const fragment = range.createContextualFragment(String(html));
    return Array.from(fragment.children);
  };

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const url = new URL(source, window.location.origin);

      const page = Number(btn.dataset.page || "2");
      if (!url.searchParams.has("page"))
        url.searchParams.set("page", String(page));

      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return;

      const data = await res.json();

      if (!data.html || !String(data.html).trim()) {
        btn.style.display = "none";
        return;
      }

      const nodes = parseHtmlChildren(data.html);

      const cols = nodes.filter(
        (el) => el.className && el.className.includes("col-")
      );

      if (!cols.length) {
        btn.style.display = "none";
        return;
      }

      grid.append(...cols);

      btn.dataset.page = String(page + 1);

      if (data.nextUrl) {
        window.archiveLoadMoreSource = data.nextUrl;
        btn.dataset.source = data.nextUrl;
      }

      const hasMore =
        data.hasMore ?? data.has_more ?? data.more ?? data.nextPage != null;
      if (hasMore === false) btn.style.display = "none";
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoading(false);
    }
  });
})();
