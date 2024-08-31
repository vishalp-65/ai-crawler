import httpStatus from "http-status";
import { ApiError } from "../utils";
import axios from "axios";
import { CrawledData } from "../models/crawledData";
import * as cheerio from "cheerio";

class CrawlerService {
    public static async crawler(url: string, content: string) {
        if (!url || !content) {
            throw new ApiError(httpStatus.BAD_REQUEST, "All fileds required");
        }
        console.log("service", { url });
        try {
            const { data } = await axios.get(url);
            // console.log("data", data);
            // console.log("cheerio", cheerio);
            const $ = cheerio.load(data);

            const text = $("body").text().trim();
            const images = $("img")
                .map((_, img) => $(img).attr("src"))
                .get();
            const links = $("a")
                .map((_, link) => $(link).attr("href"))
                .get();

            const crawledData = new CrawledData({ url, text, images, links });
            await crawledData.save();
            console.log("data", { url, text, images, links });
            return "Data crawled and saved successfully";
        } catch (error) {
            console.log("error while crawling", error);
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Unable to crawl web URL"
            );
        }
    }
}

export default CrawlerService;
