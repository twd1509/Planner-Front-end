
// 전화번호 자르기
export function formatPhoneNumber(value) {
    const raw = value.replace(/\D/g, "");
  
    if (raw.length < 4) return raw;
    if (raw.length < 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    if (raw.length < 11) return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
}
  