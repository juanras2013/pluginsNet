const LZStringDecoder = {
    decompressFromEncodedURIComponent: function(r) {
        return null == r ? "" : "" == r ? null : LZStringDecoder._decompress(r.length, 32, function(o) {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".indexOf(r.charAt(o));
        });
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

(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const compressedCode = urlParams.get('code');
    if (!compressedCode) return;

    try {
        const decodedHtml = LZStringDecoder.decompressFromEncodedURIComponent(compressedCode);
        if (decodedHtml) {
            document.body.innerHTML = "";
            document.body.style.margin = "0";
            document.body.style.padding = "0";
            document.body.style.overflow = "hidden";

            const iframe = document.createElement("iframe");
            iframe.setAttribute("sandbox", "allow-scripts");
            iframe.style.position = "fixed";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.width = "100vw";
            iframe.style.height = "100vh";
            iframe.style.border = "none";
            
            document.body.appendChild(iframe);
            await new Promise(resolve => setTimeout(resolve, 10));
            
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(decodedHtml);
            iframe.contentWindow.document.close();
        }
    } catch(e) {
        console.error(e);
    }
})();
