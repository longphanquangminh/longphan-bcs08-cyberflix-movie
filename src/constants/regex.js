export const trailerUrlRegex =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|attribution_link\?a=|yts\/v|v\/)|youtu\.be\/)([A-Za-z0-9_-]+)/;
export const trailerYoutube = /youtu\.be\/([A-Za-z0-9_-]+)/;
export const imageUrlRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
export const positiveNumberRegex = /^[+]?((0*[1-9]+\d*)|(\d*\.\d+([eE][-+]?\d+)?))$/;
export const unitedStatesPriceRegex = /^(75000(\.0+)?|7[5-9]\d{3}(\.\d+)?|[89]\d{4}(\.\d+)?|1\d{5}(\.\d+)?|200000)$/;
export const priceRegex = /^(75000(,0+)?|7[5-9]\d{3}(,\d+)?|[89]\d{4}(,\d+)?|1\d{5}(,\d+)?|200000)$/;
