const LZString = {
    compressToEncodedURIComponent: function(o) {
        if (null == o) return "";
        return LZString._compress(o, 6, function(o) { return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(o); });
    },
    decompressFromEncodedURIComponent: function(r) {
        return null == r ? "" : "" == r ? null : LZString._decompress(r.length, 32, function(o) {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".indexOf(r.charAt(o));
        });
    },
    _compress: function(o, r, n) {
        if (null == o) return "";
        var e, t, i, s = {}, a = {}, p = "", c = "", l = "", f = 2, w = 3, h = 0, d = 0, v = 0;
        for (i = 0; i < o.length; i += 1) if (p = o.charAt(i), Object.prototype.hasOwnProperty.call(s, p) || (s[p] = w++, a[p] = !0), c = l + p, Object.prototype.hasOwnProperty.call(s, c)) l = c; else {
            if (Object.prototype.hasOwnProperty.call(a, l)) {
                if (l.charCodeAt(0) < 256) {
                    for (e = 0; e < v; e++) h <<= 1, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++;
                    for (t = l.charCodeAt(0), e = 0; e < 8; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
                } else {
                    for (t = 1, e = 0; e < v; e++) h = h << 1 | t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t = 0;
                    for (t = l.charCodeAt(0), e = 0; e < 16; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
                }
                f--, 0 == f && (f = Math.pow(2, v), v++), delete a[l];
            } else for (t = s[l], e = 0; e < v; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
            f--, 0 == f && (f = Math.pow(2, v), v++), s[c] = w++, l = String(p);
        }
        if ("" !== l) {
            if (Object.prototype.hasOwnProperty.call(a, l)) {
                if (l.charCodeAt(0) < 256) {
                    for (e = 0; e < v; e++) h <<= 1, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++;
                    for (t = l.charCodeAt(0), e = 0; e < 8; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
                } else {
                    for (t = 1, e = 0; e < v; e++) h = h << 1 | t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t = 0;
                    for (t = l.charCodeAt(0), e = 0; e < 16; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
                }
                f--, 0 == f && (f = Math.pow(2, v), v++), delete a[l];
            } else for (t = s[l], e = 0; e < v; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
            f--, 0 == f && (f = Math.pow(2, v), v++);
        }
        for (t = 2, e = 0; e < v; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
        for (;;) { if (h <<= 1, d == r - 1) { f += n(h); break; } d++; }
        return f;
    },
    _decompress: function(o, r, n) {
        var e, t, i, s, a, p, c, l = [], f = 4, w = 4, h = 3, d = "", v = [], m = { val: n(0), position: r, index: 1 };
        for (e = 0; e < 3; e += 1) l[e] = e;
        for (i = 0, a = Math.pow(2, 2), p = 1; p != a;) s = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = r, m.val = n(m.index++)), i |= (s > 0 ? 1 : 0) * p, p <<= 1;
        switch (i) {
            case 0: for (i = 0, a = Math.pow(2, 8), p = 1; p != a;) s = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = r, m.val = n(m.index++)), i |= (s > 0 ? 1 : 0) * p, p <<= 1; c = String.fromCharCode(i); break;
            case 1: for (i = 0, a = Math.pow(2, 16), p = 1; p != a;) s = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = r, m.val = n(m.index++)), i |= (s > 0 ? 1 : 0) * p, p <<= 1; c = String.fromCharCode(i); break;
            case 2: return "";
        }
        for (l = c, t = c, v.push(c); ;) {
            if (m.index > o) return "";
            for (i = 0, a = Math.pow(2, h), p = 1; p != a;) s = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = r, m.val = n(m.index++)), i |= (s > 0 ? 1 : 0) * p, p <<= 1;
            switch (c = i) {
                case 0: for (i = 0, a = Math.pow(2, 8), p = 1; p != a;) s = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = r, m.val = n(m.index++)), i |= (s > 0 ? 1 : 0) * p, p <<= 1; l[w++] = String.fromCharCode(i), c = w - 1, f--; break;
                case 1: for (i = 0, a = Math.pow(2, 16), p = 1; p != a;) s = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = r, m.val = n(m.index++)), i |= (s > 0 ? 1 : 0) * p, p <<= 1; l[w++] = String.fromCharCode(i), c = w - 1, f--; break;
                case 2: return v.join("");
            }
            if (0 == f && (f = Math.pow(2, h), h++), l[c]) d = l[c]; else { if (c !== w) return null; d = t + t.charAt(0); }
            v.push(d), l[w++] = t + d.charAt(0), f--, t = d, 0 == f && (f = Math.pow(2, h), h++);
        }
    }
};

window.GalaxxxShare = {
    generateLink: function(htmlContent) {
        const compressed = LZString.compressToEncodedURIComponent(htmlContent);
        const baseUrl = window.location.href.split('?')[0];
        return `${baseUrl}?code=${compressed}`;
    }
};

(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const compressedCode = urlParams.get('code');

    if (compressedCode) {
        try {
            const decodedHtml = LZString.decompressFromEncodedURIComponent(compressedCode);

            if (decodedHtml) {
                document.documentElement.innerHTML = "";
                
                const iframe = document.createElement("iframe");
                iframe.setAttribute("sandbox", "allow-scripts");
                iframe.style.position = "fixed";
                iframe.style.top = "0";
                iframe.style.left = "0";
                iframe.style.width = "100vw";
                iframe.style.height = "100vh";
                iframe.style.border = "none";
                iframe.style.margin = "0";
                iframe.style.padding = "0";
                
                document.body.appendChild(iframe);
                
                await new Promise(resolve => setTimeout(resolve, 10));
                
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.write(decodedHtml);
                iframe.contentWindow.document.close();
            }
        } catch(e) {
            console.error(e);
        }
    }
})();
