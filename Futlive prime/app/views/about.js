export function aboutView() {
    return `

        <style>
            //  I am not sure the video i have used requires copright i hope not as it is being locally hosted
            video {
                max-width: 100%;
                height: auto;
                max-width: 1800px;  
                height: auto;       
                display: block;     
                margin: 20px 0;    
            }
        </style>
        <section>
            <h2>What is FutLive?</h2>
            <p>FutLive is built for fans who want a clear, giving you the way to follow everything happening in the Premier League. The goal is simple: bring together the matches, them all in one place.</p>
            <div style="text-align: center;">
                <video autoplay muted playsinline>
                    <source src="/assets/video/premier-league-intro.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <p>The Premier League moves fast, and keeping up can feel overwhelming. FutLive organizes the essentials into an easy, streamlined experience. You will be able to keep track of missed matches upcoming ones and those currently live. Know if Halaaand is still toping the sxorers charts and who is leading the race to be the next premier league champions</p>
            <p>FutLive not as comprehensive and expansive  as other platforms we aim to only provide essential information</p>
        </section>
    `;
}