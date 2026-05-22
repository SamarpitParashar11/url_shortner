// npm install express cors dotenv

    // Installs three runtime dependencies:
    // express: web server framework for Node.js. You use it to define routes like /api/shorten, handle requests, send responses, etc.
    // cors: middleware that lets your backend accept requests from a different origin, for example a frontend running on localhost:3000 calling a backend on localhost:5000.
        // Tere browser ke andar ek bahut strict security guard baitha hota hai, jisko Same-Origin Policy (SOP) kehte hain.

        // SOP ka rule simple hai: "Jis ghar (origin) se tum aaye ho, sirf usi ghar ke server se baat kar sakte ho. Kisi doosre ghar (cross-origin) me taak-jhaank allowed nahi hai."

        // Origin Kya Hota Hai?
        // Ek "Origin" teen cheezon se milkar banta hai:

        // Protocol (e.g., http:// ya https://)

        // Domain (e.g., localhost ya google.com)

        // Port (e.g., :3000 ya :5000)

        // Tere example mein, Frontend ka ghar http://localhost:3000 hai aur Backend ka ghar http://localhost:5000 hai. Kyunki dono ka Port alag hai, browser inko do alag-alag ghar (Cross-Origin) maanta hai.

        // Bouncer Analogy: CORS Ka Asli Kaam
        // Maan le tera backend (localhost:5000) ek exclusive VIP Club hai, aur tera browser us club ka strict Bouncer hai.

        // The Block: Tera frontend (localhost:3000) club mein ghusne (API request karne) aata hai. Bouncer (browser) uski ID check karta hai. Wo dekhta hai ki yeh toh doosre area (port 3000) se aaya hai. Bouncer turant usko rok deta hai: "Entry nahi milegi, tum yahan ke nahi ho." (Yehi tera famous CORS error hai).

        // The Fix (CORS Middleware): Tu backend developer hai. Tu club ke manager (Server) ke paas jata hai aur bolta hai, "Bhai, wo 3000 wale apne hi ladke hain, unko andar aane dena." Yehi kaam CORS middleware karta hai.

        // The Preflight Check: Ab jab agali baar tera frontend request bhejta hai, toh bouncer seedha block nahi karta. Wo pehle backend (manager) se walkie-talkie par confirm karta hai: "Sir, localhost:3000 se koi aane ki koshish kar raha hai, kya isko allow karna hai?" Is walkie-talkie check ko tech language mein Preflight Request (OPTIONS call) bolte hain.

        // The Approval: Kyunki tune backend mein CORS middleware laga diya tha, backend turant reply karta hai: "Haan, Access-Control-Allow-Origin: http://localhost:3000. Inko aane do." Bouncer rasta khol deta hai aur tera frontend data fetch kar leta hai.

        // Short Summary
        // Browser security ke liye by default kisi aur port/domain se data aane nahi deta. CORS (Cross-Origin Resource Sharing) backend ka wo VIP Pass hai, jo browser ko bataata hai ki: "Ghabrao mat, yeh frontend safe hai, isko mera data use karne do."
    
    // dotenv: loads environment variables from a .env file into process.env, commonly for things like PORT, database URLs, secrets, API keys.


// npm install nodemon --save-dev

    //     Installs nodemon as a development-only dependency.

    // nodemon: automatically restarts your Node server when files change, so you do not have to stop and rerun node server.js manually.
    // --save-dev: puts it under "devDependencies" because it is useful while developing, but usually not needed in production.







const express = require(express);
    
const app = express();
    //Node.js ko bolti hai: express package load karo.
    // Jo Express module return hota hai, usko express variable me store karti hai.
    // Phir tum isse app bana sakte ho: 

app.use(express.json());
    // app.use(express.json()); Express app me middleware lagata hai jo incoming request body ko JSON ke form me read/parse karta hai.

app.get("/", (req, res) => {
    res.send("Server running");
});
    // Jab koi user/browser tumhare server ka root URL open karega, jaise:

    // http://localhost:5000/
    // to server response me ye text bhejega:

    // Server running
    // Matlab ye ek simple test route hai. Isse pata chalta hai ki Express server properly chal raha hai ya nahi.

    
app.listen(5000, () => {
    console.log("Server started");
    });

    // app.listen(5000): tumhara Express server port 5000 par listen/start hoga.
    // Jab server successfully start ho jayega, callback function chalega.
    // console.log("Server started"): terminal me message print hoga.

