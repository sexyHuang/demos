/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  let begin = 0,
    end = -1,
    start = 0,
    minLength = s.length,
    found = 0,
    t_charCode = new Array(255).fill(0),
    s_charCode = new Array(255).fill(0);
  for (let i = 0; i < t.length; i++) {
    t_charCode[t.charCodeAt(i)]++;
  }
  for (let i = 0; i < s.length; i++) {
    let _charCode = s.charCodeAt(i);
    s_charCode[_charCode]++;
    if (s_charCode[_charCode] <= t_charCode[_charCode]) found++;
    if (found === t.length) {
      while (
        s_charCode[s.charCodeAt(start)] > t_charCode[s.charCodeAt(start)]
      ) {
        s_charCode[s.charCodeAt(start)]--;
        start++;
      }
      if (i - start < minLength) {
        end = i;
        begin = start;
        minLength = i - start;
      }
      
      s_charCode[s.charCodeAt(start)]--;
      start++;
      found--;
    }
  }
  return s.substring(begin, end + 1);
};

console.log(minWindow('ADOBECODEBANC', 'ABC'));
