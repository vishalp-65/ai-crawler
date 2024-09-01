import { CrawlModel } from "@/models";
import * as cheerio from "cheerio";

export async function dataCrawler(data: any) {
    let crawlResponse: any;
    const $ = cheerio.load(data);

    const text = $("body").text().trim();
    const images = $("img")
        .map((_, img) => $(img).attr("src"))
        .get();
    const links = $("a")
        .map((_, link) => $(link).attr("href"))
        .get();

    crawlResponse = await CrawlModel.create({
        text,
        images,
        links,
    });
    return { text, crawlResponse };
}
