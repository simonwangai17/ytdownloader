const express = require('express');
const app = express();
const ytdl = require('ytdl-core');

app.use(express.json());

app.get('/resolutions', (req, res) => {
    const videoUrl = req.query.url;
    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    ytdl.getInfo(videoUrl, (err, info) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching video info' });
        }

        const resolutions = info.formats
            .filter(format => format.qualityLabel)
            .map(format => format.qualityLabel);

        res.json({ resolutions });
    });
});

app.get('/download', (req, res) => {
    const videoUrl = req.query.url;
    const quality = req.query.quality;

    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(videoUrl, { quality: quality }).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
