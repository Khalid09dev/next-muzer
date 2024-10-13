"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Play, SkipForward, ThumbsDown, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for the queue
const initialQueue = [
{ id: 1, title: "Rick Astley - Never Gonna Give You Up", votes: 5, videoId: "dQw4w9WgXcQ" },
{ id: 2, title: "He-Man HEYYEYAAEYAAAEYAEYAA", votes: 3, videoId: "ZZ5LpwO-An4" },
{ id: 3, title: "Darude - Sandstorm", votes: 1, videoId: "y6120QOlsfU" },
]

export default function Dashboard() {
const [queue, setQueue] = useState(initialQueue)
const [currentVideo, setCurrentVideo] = useState(queue[0])
const [inputLink, setInputLink] = useState("")
const [previewVideo, setPreviewVideo] = useState(null)

useEffect(() => {
    // Sort queue by votes whenever it changes
    setQueue(prevQueue => [...prevQueue].sort((a, b) => b.votes - a.votes))
}, [])

const handleSubmit = async (e) => {
    e.preventDefault()
    const videoId = extractVideoId(inputLink)
    if (videoId) {
        try {
            const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
            const data = await response.json()
            const newVideo = {
                id: queue.length + 1,
                title: data.title,
                votes: 0,
                videoId,
            }
            setQueue(prevQueue => {
                const updatedQueue = [...prevQueue, newVideo]
                return updatedQueue.sort((a, b) => b.votes - a.votes) // Sort the queue when adding a new video
            })
            setInputLink("")
            setPreviewVideo(null)
        } catch (error) {
            console.error("Error fetching video data:", error)
        }
    }
}

const handleInputChange = (e) => {
    setInputLink(e.target.value)
    const videoId = extractVideoId(e.target.value)
    setPreviewVideo(videoId)
}

const handleVote = (id, increment) => {
    setQueue(prevQueue => {
        const updatedQueue = prevQueue.map(video =>
            video.id === id ? { ...video, votes: video.votes + increment } : video
        )
        return [...updatedQueue].sort((a, b) => b.votes - a.votes) // Sort the updated queue
    })
}

const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
}

const playNextVideo = () => {
    const currentIndex = queue.findIndex(video => video.id === currentVideo.id)
    const nextIndex = (currentIndex + 1) % queue.length
    setCurrentVideo(queue[nextIndex])
}

const handleShare = async (platform) => {
    const url = window.location.href
    const text = "Check out this awesome song voting queue!"

    switch (platform) {
    case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
        break
    case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
    case 'copy':
        try {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        } catch (err) {
        console.error('Failed to copy: ', err)
        }
        break
    }
}

return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-900 text-gray-100">
    <div className="container mx-auto p-4 space-y-6 flex-grow">

    <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Song Voting Queue</h1>
    <Dialog>
        <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
        <DialogHeader>
            <DialogTitle>Share this queue</DialogTitle>
            <DialogDescription>
            Invite your fans to vote on the next song!
            </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around py-4">
            <Button onClick={() => handleShare('twitter')} variant="outline">
            Share on Twitter
            </Button>
            <Button onClick={() => handleShare('facebook')} variant="outline">
            Share on Facebook
            </Button>
            <Button onClick={() => handleShare('copy')} variant="outline">
            Copy Link
            </Button>
        </div>
        </DialogContent>
    </Dialog>
    </div>

        {/* Input form for new videos */}
        <form onSubmit={handleSubmit} className="space-y-2">
        <Input
            type="text"
            placeholder="Enter YouTube video link"
            value={inputLink}
            onChange={handleInputChange}
            className="bg-gray-800 text-gray-100 border-gray-700"
        />
        <Button type="submit" className="w-full">Add to Queue</Button>
        </form>

        {/* Preview of submitted video */}
        {previewVideo && (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Video Preview</h2>
            <div className="aspect-video">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${previewVideo}`}
                title="Video preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
        </div>
        )}

        {/* Queue of upcoming videos */}
        <div className="space-y-2">
        <h2 className="text-xl text-white font-semibold">Upcoming Songs</h2>
        {queue.map((video) => (
            <Card key={video.id} className="bg-gray-800 border-gray-700">
            <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                <Image src={`https://img.youtube.com/vi/${video.videoId}/default.jpg`} alt={video.title} width={100} height={100} className="w-24 h-18 object-cover rounded" />
                <span className="font-medium text-white">{video.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleVote(video.id, 1)}
                    className="border-gray-600 hover:bg-gray-700"
                >
                    <ThumbsUp className="h-4 w-4"/>
                </Button>
                <span className="text-sm text-white font-semibold min-w-[2ch] text-center">{video.votes}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleVote(video.id, -1)}
                        className="border-gray-600 hover:bg-gray-700"
                    >
                        <ThumbsDown className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentVideo(video)}
                        className="border-gray-600 hover:bg-gray-700"
                    >
                        <Play className="h-4 w-4" />
                    </Button>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>

    {/* Currently playing video */}
    <div className="bottom-0 w-full bg-gray-800 border-t border-gray-700 p-4">
        <div className="container mx-auto">
        <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
        <div className="flex items-start space-x-4">
            <div className="aspect-video w-1/3">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
            <div className="flex-grow flex flex-col justify-between">
            <p className="text-lg font-medium">{currentVideo.title}</p>
            <Button onClick={playNextVideo} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-32">
                <SkipForward className="mr-2 h-4 w-4" /> Play Next
            </Button>
            </div>
        </div>
        </div>
    </div>
    </div>
)
}