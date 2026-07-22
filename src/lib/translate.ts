export const translateText = async (payload: {
  text: string;
  targetLang: string;
}): Promise<string> => {
  const { text, targetLang } = payload;
  if (!text || targetLang === "tr") return text;

  const langMap: Record<string, string> = {
    zh: "zh-CN",
  };
  const target = langMap[targetLang] || targetLang;

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${target}&dt=t&q=${encodeURIComponent(text)}`,
    );
    const data = await response.json();
    return data[0].map((item: any) => item[0]).join("");
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};

export const translateAnyText = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  if (!text || sourceLang === targetLang) return text;

  const langMap: Record<string, string> = {
    zh: "zh-CN",
  };
  const target = langMap[targetLang] || targetLang;
  const source = langMap[sourceLang] || sourceLang;

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0].map((item: any) => item[0]).join("");
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};
