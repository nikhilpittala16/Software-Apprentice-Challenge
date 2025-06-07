function normalizeAd(ad) {
  return {
    campaign: ad.campaign || ad.campaign_name || ad.utm_campaign || "",
    adset:
      ad.media_buy_name ||
      ad.ad_group ||
      ad.ad_squad_name ||
      ad.utm_medium ||
      "",
    creative:
      ad.ad_name || ad.image_name || ad.creative_name || ad.utm_content || "",
    spend: ad.spend || ad.cost || 0,
    impressions: ad.impressions || 0,
    clicks: ad.clicks || ad.post_clicks || 0,
    results: ad.results || "",
  };
}
export default normalizeAd;
