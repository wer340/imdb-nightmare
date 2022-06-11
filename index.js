const request=require("request-promise");
const cheerio=require("cheerio");


const sampleResult={
    title:"The Lost City",
    rank:15,
    imdbRating:8.4,
    descriptionThe :"https://www.imdb.com/title/tt13320622/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=TPQSP59R5B3EESAK4Z04&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_15",
    posterUrl:"https://www.imdb.com/title/tt13320622/mediaviewer/rm3056854785/?ref_=tt_ov_i"

};
async function scarpTitlesRanksAndRating (){
const result= await request.get("https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm");
const $=await cheerio.load(result);
const movie =$("tr").map((i,element)=>{

const title=$(element).find("td.titleColumn > a").text();
const descriptionMovie="https://www.imdb.com"+$(element).find("td.titleColumn > a").attr("href");

const ratingMovie=$(element).find("td.ratingColumn.imdbRating").text().trim();
return{title,ratingMovie,rank:i,descriptionMovie}
}).get();
console.log(movie)
}

scarpTitlesRanksAndRating();
