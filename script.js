function processVideo() {
    var videoUrl = document.getElementById('videoUrl').value;
    
    fetch(`/resolutions?url=${encodeURIComponent(videoUrl)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var resolutionOptions = document.getElementById('resolutionOptions');
            resolutionOptions.innerHTML = '';
            data.resolutions.forEach(resolution => {
                var button = document.createElement('button');
                button.textContent = resolution;
                button.onclick = function() {
                    startDownload(videoUrl, resolution);
                };
                resolutionOptions.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function startDownload(videoUrl, resolution) {
    window.location.href = `/download?url=${encodeURIComponent(videoUrl)}&quality=${encodeURIComponent(resolution)}`;
}
