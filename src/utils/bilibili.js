/**
 * B 站链接解析与生成工具。
 *
 * 用户提供的链接形如：
 * https://www.bilibili.com/video/BV12gA4z3ETZ/?t=7
 *
 * 约定：保存并展示完整的原始地址，同时解析 BV 号和开始秒数 t。
 */
const BV_REGEX = /BV[0-9A-Za-z]{10}/
const T_REGEX = /[?&]t=(\d+)/

/** 解析用户原始 B 站链接，返回结构化信息。无法解析时 bvid 为 null。 */
export function parseBilibili(url) {
  const raw = (url || '').trim()
  const bvid = raw.match(BV_REGEX)?.[0] ?? null
  const start = Number(raw.match(T_REGEX)?.[1] ?? 0) || 0
  return {
    url: raw,
    bvid,
    start,
  }
}

/** 生成“在 B 站打开”的原始链接：带开始秒数时保留 t 参数。 */
export function buildExternalUrl({ bvid, start }) {
  if (!bvid) return ''
  return start > 0 ? `https://www.bilibili.com/video/${bvid}/?t=${start}` : `https://www.bilibili.com/video/${bvid}`
}

/** 生成 B 站嵌入播放器地址。嵌入播放器不保证支持 t，仅作首选。 */
export function buildEmbedUrl({ bvid, start }) {
  if (!bvid) return ''
  const base = `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&autoplay=1&high_quality=1&danmaku=0`
  return start > 0 ? `${base}&t=${start}` : base
}
