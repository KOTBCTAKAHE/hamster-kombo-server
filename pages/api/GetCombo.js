// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["gamefi_tokens", "margin_trading_x30", "trading_bots"],
    date: "14-06-24"
  });
}
