const NewsSchema=require("../model/newsSchema")
//const fs = require('fs')

exports.fetchnews = (req, res) => {

  NewsSchema.find({}).then((data, err) => {
      if (err) {
        res.json({ status: "failed", message: err });
      } else {
        res.json({ status: "success", data: data });
      }
    }); 
  }

  exports.fetchimagesnews= (req, res) => {

  }

  /* exports.fetchvideonews = (req, res) => {
    const path = 'assets/videos/sample.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1
    
        if(start >= fileSize) {
          res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
          return
        }
        
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        }
    
        res.writeHead(206, head)
        file.pipe(res)
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
      }

  } */

  //SAVE MOCK DATA TO DATA BASE 
   
   //SAVING TEMPORARLY

/*    const data = [
    { shortname:"fifa",title: "Premier League Stars Are Taking Their Game To FIFA 20", subtitle: "You'll still get to see your favorite Premier League teams face off this year.", description: "The latest sports league to take its games virtual is the English Premier League, the highest level of English football. The new ePremier League Invitational tournament will pit the Premier League's 20 teams against each other in FIFA 20, with each team represented by a player or a celebrity. The players representing their teams in the esports tournament include Trent Alexander-Arnold (Liverpool), Todd Cantwell (Norwich City), Ryan Fredericks (West Ham United), Diogo Jota (Wolverhampton Wanderers), Raheem Sterling (Manchester City), and Wilfried Zaha (Crystal Palace). Manchester United will be represented by musician Tom Grennan, a fan of the club who once trained to be a professional footballer.", releasedate: "20 April 2020", agelimit: 0, platform: ["PS4", "XBOX"], author: "Hayley Williams", gamewebsite: "www.easports.com" },
  { shortname:"digimon",title: "Digimon Adventure: Last Evolution Kizuna Will Come To Blu-Ray In July", subtitle: "With its theatrical release canned, Digimon fans will have to buy Last Evolution in hard copy.", description: "Originally planned for a limited theatrical release in March, Digimon Adventure: Last Evolution Kizuna became a victim of the widespread coronavirus closures and cancellations. After leaving fans wondering how they would be able to experience Tai and friend's supposed farewell from the series, publisher Shout Factory has announced the Blu-Ray and DVD release for later this year.As picked up by Siliconera, Last Evolution will be released on Blu-Ray and DVD on July 7, 2020. Because of the cancelled cinema events, the English home release has been announced before the Japanese version. It's unusual in the world of anime localization for the western home video release to be announced before Japan's, though the Japanese theatrical debut was early enough to be unaffected by coronavirus. The US hard copy release will include both Japanese audio with English subtitles and the English dub.", releasedate: "21 April 2020", agelimit: 0, platform: ["PS4", "XBOX", "NINTENDO"], author: "Hayley Williams", gamewebsite: "https://digimon.fandom.com/wiki/Digimon_Adventure" },
  { shortname:"final",title: "Final Fantasy 7 Remake Chapter 12 Walkthrough: Fight For Survival (Spoiler-Free)", subtitle: "Keep fighting your way through Midgar with our Final Fantasy 7 Remake walkthrough, covering Chapter 12: Fight For Survival.", description: "Our Final Fantasy 7 Remake walkthrough continues, taking you through the streets of Midgar to win every boss battle, find every collectible, and unlock every secret. Chapter 12 is mostly a battle chapter, serving as the culmination of everything that's happened since the end of Chapter 9. Check out the guide below for all the details.Check out the rest of our Final Fantasy 7 Remake guides so you don't miss a single secret or collectible. ", releasedate: "20 April 2020", agelimit: 12, platform: ["PS4", "XBOX", "WIN"], author: "Phil Hornshaw", gamewebsite: "https://ffvii-remake.square-enix-games.com/en-us" },
  { shortname:"fortnite",title: "Fortnite Update 12.41--When It Hits, And When To Expect Downtime", subtitle: "The next update for Epic's battle royale is coming--here's when Fortnite will go down to apply the update", description: "The next Fortnite update is arriving very soon, and as usual there will be a brief downtime while the game updates to v12.41. You can expect an update on Tuesday April 21, and downtime will begin at 2 AM ET (6 AM UTC).This is familiar to Fortnite fans by now, of course, but as we move into Season 2 Week 10, it's good to be prepared--especially if you haven't done the Week 9 challenges yet.", releasedate: "18 April 2020", agelimit: 12, platform: ["PS4", "XBOX", "WIN"], author: "James O'Connor", gamewebsite: "https://www.epicgames.com/fortnite" },
  { shortname:"cad",title: "How To Download Call Of Duty: Warzone--CoD: Modern Warfare's Battle Royale", subtitle: "Here's how to play Call of Duty: Warzone on PC, PS4, and Xbox One, with and without Modern Warfare.", description: "Call of Duty: Warzone is a free-to-play battle royale game for PC, PlayStation 4, and Xbox One that recently passed the milestone of 50 million players. Warzone can be installed both as an update to Call of Duty: Modern Warfare or as a free, standalone game for players who don't own Modern Warfare and aren't interested in purchasing it. The battle royale game is a huge download size even if you don't have Modern Warfare, but don't worry--that just gives you some time to check out our list of Warzone tips while it's installing. Or read up on the Season 3 patch notes for the big update that went live last week.Find our quick how-to guide for installing Call of Duty: Warzone, and learn more about how Warzone and Modern Warfare's unified progression works, below", releasedate: "19 April 2020", agelimit: 18, platform: ["WIN"], author: "Alessandro Barbosa", gamewebsite: "https://www.callofduty.com/" },
  { shortname:"valorant",title: "Valorant Beta Access: How To Get Into The Valorant Closed Beta", subtitle: "Breaking down how Valorant's Closed Beta entitlements work and how to get into the beta.", description: "Riot Games' new competitive shooter, Valorant, isn't officially out (and probably won't be for a while), but the closed beta is available right now and has attracted plenty of attention from competitive shooter fans already. You'll need a beta key to participate--and you'll have to complete a few steps in order to receive one. Riot has already explained how Valorant beta keys work in a blog post, the details of which we'll go over below, but the biggest takeaway is that you'll need to log plenty of hours watching Valorant streams in order to get Valorant beta access.For more information on how to increase your chances of getting an invite, including which streams can drop invites, and for Riot's overview of how closed beta entitlements work, read on below. To see if your PC can even run the game, check out the minimum and recommended Valorant system requirements.", releasedate: "17 April 2020", agelimit: 18, platform: ["PS4", "XBOX","WIN"], author: "Eddie Makuch", gamewebsite: "https://beta.playvalorant.com/" }
]


 data.map((news)=>{
  var newspart= new NewsSchema({
    shortname:news.shortname,
    title:news.title,
    subtitle:news.subtitle,
    description:news.description,
    releasedate:news.releasedate,
    agelimit:news.agelimit,
    platform:news.platform,
    author:news.author,
    gamewebsite:news.gamewebsite,
   })
    newspart.save().then((res)=>{ //SAVING HTE MOCK DATA TO MONGODB
    console.log("saved",res)
  }) 

 }) */