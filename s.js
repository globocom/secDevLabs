const str = "<script>dsdfds</script>";

const s = str.substring(8);

for (let i = 0; i < s.length; i++) {
    if (s[i] === "<") {
        var x = i - 1;
    }
}

const z = s.substring(0, x);
