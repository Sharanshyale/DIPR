import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { getVideos } from "../../../services/videoApi/videoApi"
import {
  CarouselContainer,
  CarouselHeader,
  CarouselTitle,
  CarouselWrapper,
  CarouselTrack,
  VideoCard,
  VideoThumbnail,
  VideoOverlay,
  PlayButton,
  VideoInfo,
  ChannelInfo,
  ChannelName,
  SubscribeButton,
  NavigationButton,
  VideoTitle,
  VideoPlayer,
  ProgressBar,
  ProgressIndicator,
  ShimmerContainer,
  ShimmerThumbnail,
  ShimmerTitle,
  ShimmerChannel,
  ShimmerButton
} from "../homevideosection/ShortsCarousel.styles"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import { CarouselTitleWrapper } from "./ShortsCarousel.styles"

const ShortsCarousel = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const [progress, setProgress] = useState(0)
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [visibleVideos, setVisibleVideos] = useState(5)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await getVideos()
        if (response.success && Array.isArray(response.data)) {
          setVideos(response.data)
        } else {
          // If no videos or error, create placeholder data
          const placeholderVideos = Array(10)
            .fill()
            .map((_, index) => ({
              _id: `placeholder-${index}`,
              title: `Shorts Video ${index + 1}`,
              thumbnail: `/placeholder.svg?height=400&width=225&text=Video ${index + 1}`,
              video_url: "",
            }))
          setVideos(placeholderVideos)
        }
      } catch (error) {
        console.error("Error fetching videos:", error)
        // Create placeholder data on error
        const placeholderVideos = Array(10)
          .fill()
          .map((_, index) => ({
            _id: `placeholder-${index}`,
            title: `Shorts Video ${index + 1}`,
            thumbnail: `/placeholder.svg?height=400&width=225&text=Video ${index + 1}`,
            video_url: "",
          }))
        setVideos(placeholderVideos)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  useEffect(() => {
    const updateVisibleVideos = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleVideos(1)
        setIsMobile(true)
        setIsTablet(false)
      } else if (width < 768) {
        setVisibleVideos(2)
        setIsMobile(false)
        setIsTablet(true)
      } else if (width < 1024) {
        setVisibleVideos(3)
        setIsMobile(false)
        setIsTablet(true)
      } else if (width < 1280) {
        setVisibleVideos(4)
        setIsMobile(false)
        setIsTablet(false)
      } else {
        setVisibleVideos(5)
        setIsMobile(false)
        setIsTablet(false)
      }
    }

    updateVisibleVideos()
    window.addEventListener("resize", updateVisibleVideos)

    return () => {
      window.removeEventListener("resize", updateVisibleVideos)
    }
  }, [])

  // Handle video progress
  useEffect(() => {
    let interval
    if (playingVideoId && videoRef.current) {
      interval = setInterval(() => {
        if (videoRef.current) {
          const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
          setProgress(currentProgress)
        }
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [playingVideoId])

  const handleNext = () => {
    if (currentIndex < videos.length - visibleVideos) {
      setCurrentIndex(currentIndex + 1)
      scrollToIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      scrollToIndex(currentIndex - 1)
    }
  }

  const scrollToIndex = (index) => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.children[0]?.offsetWidth || 0
      const scrollPosition = index * cardWidth
      trackRef.current.style.transform = `translateX(-${scrollPosition}px)`
    }
  }

  const handlePlayClick = (videoId) => {
    setPlayingVideoId(videoId === playingVideoId ? null : videoId)
    setProgress(0)
  }

  // Touch and mouse events for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 2 
    const newIndex = currentIndex - Math.sign(walk) * (Math.abs(walk) > 50 ? 1 : 0)

    if (newIndex >= 0 && newIndex <= videos.length - visibleVideos) {
      setCurrentIndex(newIndex)
      scrollToIndex(newIndex)
    }

    if (Math.abs(walk) > 50) {
      setIsDragging(false)
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 2
    const newIndex = currentIndex - Math.sign(walk) * (Math.abs(walk) > 50 ? 1 : 0)

    if (newIndex >= 0 && newIndex <= videos.length - visibleVideos) {
      setCurrentIndex(newIndex)
      scrollToIndex(newIndex)
    }

    if (Math.abs(walk) > 50) {
      setIsDragging(false)
    }
  }

  return (
    <CarouselContainer ref={containerRef}>
      <CarouselHeader>
        <CarouselTitleWrapper>
          <CarouselTitle>View All</CarouselTitle>
          <MdOutlineKeyboardDoubleArrowRight style={{ fontSize: "1.5rem" }}/>
        </CarouselTitleWrapper>
      </CarouselHeader>

      <CarouselWrapper
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchEnd={handleMouseUp}
      >
        {!isMobile && (
          <NavigationButton direction="left" onClick={handlePrev} disabled={currentIndex === 0 || loading}>
            <ChevronLeft size={24} />
          </NavigationButton>
        )}

        <CarouselTrack
          ref={trackRef}
          style={{ transform: `translateX(-${currentIndex * (100 / visibleVideos)}%)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {loading ? (
            Array(visibleVideos).fill().map((_, index) => (
              <VideoCard key={`shimmer-${index}`}>
                <ShimmerContainer>
                  <ShimmerThumbnail />
                  <VideoInfo>
                    <ShimmerTitle />
                    <ChannelInfo>
                      {/* <ShimmerChannel /> */}
                      {/* <ShimmerButton /> */}
                    </ChannelInfo>
                  </VideoInfo>
                </ShimmerContainer>
              </VideoCard>
            ))
          ) : (
            videos.map((video) => (
              <VideoCard key={video._id}>
                {playingVideoId === video._id ? (
                  <VideoPlayer>
                    <video
                      ref={videoRef}
                      controls
                      autoPlay
                      loop
                      src={
                        video.video_url || "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      }
                    >
                      Your browser does not support the video tag.
                    </video>
                    <ProgressBar>
                      <ProgressIndicator style={{ width: `${progress}%` }} />
                    </ProgressBar>
                  </VideoPlayer>
                ) : (
                  <VideoThumbnail>
                    <img src={video.thumbnail || "/placeholder.svg?height=400&width=225"} alt={video.title} />
                    <VideoOverlay>
                      <PlayButton onClick={() => handlePlayClick(video._id)}>
                        <Play size={40} />
                      </PlayButton>
                    </VideoOverlay>
                  </VideoThumbnail>
                )}

                <VideoInfo>
                  <VideoTitle>{video.title || "Farmers' Empowerment"}</VideoTitle>
                  <ChannelInfo>
                    {/* <ChannelName>Channel Name</ChannelName> */}
                    {/* <SubscribeButton>Subscribe</SubscribeButton> */}
                  </ChannelInfo>
                </VideoInfo>
              </VideoCard>
            ))
          )}
        </CarouselTrack>

        {!isMobile && (
          <NavigationButton
            direction="right"
            onClick={handleNext}
            disabled={currentIndex >= videos.length - visibleVideos || loading}
          >
            <ChevronRight size={24} />
          </NavigationButton>
        )}
      </CarouselWrapper>
    </CarouselContainer>
  )
}

export default ShortsCarousel