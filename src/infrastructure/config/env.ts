export const config = {
  wordpress: {
    siteUrl: process.env.WORDPRESS_SITE_URL || "",
    username: process.env.WORDPRESS_USERNAME || "",
    password: process.env.WORDPRESS_PASSWORD || "",
  },
  woocommerce: {
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
  }
};

export const validateConfig = () => {
  if (!config.wordpress.siteUrl) {
    throw new Error("WORDPRESS_SITE_URL is not defined in environment variables");
  }
  // Note: credentials validation might depend on the method used (WP vs Woo)
};
