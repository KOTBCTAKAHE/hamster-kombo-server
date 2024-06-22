// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["anti_money_loundering", "licence_indonesia", "top10_global"],
    date: "22-06-24"
  });
}
