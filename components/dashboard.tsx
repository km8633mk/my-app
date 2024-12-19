'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PlusCircle, Search, ChevronDown, Camera, Send, Check, X } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export function Dashboard() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const [newPacklistItem, setNewPacklistItem] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [events, setEvents] = useState([])
  const [friends, setFriends] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchEvents()
    fetchFriends()
    fetchActivities()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/`)
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${API_URL}/friendships/`)
      setFriends(response.data)
    } catch (error) {
      console.error('Error fetching friends:', error)
    }
  }

  const fetchActivities = async () => {
    // This would be replaced with an actual API call to fetch activities
    setActivities([
      { user: 'Anna', action: 'hat dich zum Event "Strandtag" eingeladen', time: 'Vor 2 Stunden' },
      { user: 'Tom', action: 'hat ein neues Foto hochgeladen', time: 'Vor 3 Stunden' },
      { user: 'Lisa', action: 'hat dem Event "Grillparty" zugesagt', time: 'Vor 5 Stunden' },
    ])
  }

  const handleInvite = useCallback(async (eventId: number) => {
    const userId = prompt('Geben Sie die Benutzer-ID des einzuladenden Freundes ein:')
    if (userId) {
      try {
        await axios.post(`${API_URL}/events/${eventId}/invite_participant/`, { user_id: userId })
        fetchEvents()
      } catch (error) {
        console.error('Error inviting participant:', error)
      }
    }
  }, [])

  const handleAddPacklistItem = useCallback(async (eventId: number) => {
    if (newPacklistItem.trim()) {
      try {
        await axios.post(`${API_URL}/packing-items/`, { event: eventId, item: newPacklistItem.trim() })
        setNewPacklistItem('')
        fetchEvents()
      } catch (error) {
        console.error('Error adding packing item:', error)
      }
    }
  }, [newPacklistItem])

  const handleRemovePacklistItem = useCallback(async (itemId: number) => {
    try {
      await axios.delete(`${API_URL}/packing-items/${itemId}/`)
      fetchEvents()
    } catch (error) {
      console.error('Error removing packing item:', error)
    }
  }, [])

  const handleSendMessage = useCallback(async (eventId: number) => {
    if (newMessage.trim()) {
      try {
        await axios.post(`${API_URL}/messages/`, { event: eventId, content: newMessage.trim() })
        setNewMessage('')
        fetchEvents()
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }, [newMessage])

  const handlePhotoUpload = useCallback(async (eventId: number, file: File) => {
    const formData = new FormData()
    formData.append('event', eventId.toString())
    formData.append('image', file)

    try {
      await axios.post(`${API_URL}/photos/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      fetchEvents()
    } catch (error) {
      console.error('Error uploading photo:', error)
    }
  }, [])

  const handleCreateEvent = async (eventData: any) => {
    try {
      await axios.post(`${API_URL}/events/`, eventData)
      fetchEvents()
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Willkommen zurück, Max!</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Neues Event erstellen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Neues Event erstellen</DialogTitle>
              <DialogDescription>
                Fülle die Details für dein neues Event aus.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleCreateEvent(Object.fromEntries(formData))
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Event Name</Label>
                  <Input id="name" name="name" placeholder="z.B. Wochenendtrip nach Berlin" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Beschreibe dein Event..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Datum</Label>
                  <Input id="date" name="date" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Ort</Label>
                  <Input id="location" name="location" placeholder="z.B. Berlin" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Event erstellen</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Deine Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="bg-muted">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Bevorstehend</TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Vergangen</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {events.map((event: any) => (
                    <Collapsible
                      key={event.id}
                      open={expandedEvent === event.id}
                      onOpenChange={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="flex justify-between items-center p-4 hover:bg-muted rounded-lg transition-colors duration-200 ease-in-out bg-[hsl(var(--event-1))] text-white">
                          <div>
                            <h3 className="font-semibold">{event.name}</h3>
                            <p className="text-sm opacity-90">{new Date(event.date).toLocaleDateString()}</p>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-4 space-y-4 bg-white rounded-b-lg shadow-inner">
                          <div className="grid gap-4 md:grid-cols-2">
                            <Card className="bg-white shadow">
                              <CardHeader>
                                <CardTitle className="text-primary">Teilnehmer</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2">
                                  {event.participants.map((participant: any) => (
                                    <Avatar key={participant.id} className="border-2 border-primary">
                                      <AvatarImage src="/placeholder-user.jpg" />
                                      <AvatarFallback className="bg-primary text-primary-foreground">{participant.username[0]}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                  <Button variant="outline" size="sm" onClick={() => handleInvite(event.id)} className="border-dashed border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Einladen
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-white shadow">
                              <CardHeader>
                                <CardTitle className="text-primary">Fotos & Videos</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-3 gap-2">
                                  {event.photos.map((photo: any) => (
                                    <img
                                      key={photo.id}
                                      src={photo.image}
                                      alt="Event photo"
                                      className="rounded-lg border-2 border-primary"
                                    />
                                  ))}
                                  <label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files) {
                                          handlePhotoUpload(event.id, e.target.files[0])
                                        }
                                      }}
                                    />
                                    <Button variant="outline" className="flex flex-col items-center justify-center h-[100px] w-full border-dashed border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                      <Camera className="h-8 w-8 mb-2" />
                                      <span className="text-xs">Hochladen</span>
                                    </Button>
                                  </label>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-white shadow">
                              <CardHeader>
                                <CardTitle className="text-primary">Packliste</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <form onSubmit={(e) => {
                                  e.preventDefault()
                                  handleAddPacklistItem(event.id)
                                }} className="flex gap-2 mb-4">
                                  <Input
                                    placeholder="Neuer Eintrag..."
                                    value={newPacklistItem}
                                    onChange={(e) => setNewPacklistItem(e.target.value)}
                                    className="border-primary"
                                  />
                                  <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </form>
                                <ScrollArea className="h-[200px]">
                                  <div className="space-y-2">
                                    {event.packing_items.map((item: any) => (
                                      <div key={item.id} className="flex items-center justify-between bg-muted p-2 rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-100">
                                            <Check className="h-4 w-4" />
                                          </Button>
                                          <span>{item.item}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => handleRemovePacklistItem(item.id)} className="text-red-600 hover:text-red-700 hover:bg-red-100">
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </ScrollArea>
                              </CardContent>
                            </Card>

                            <Card className="bg-white shadow">
                              <CardHeader>
                                <CardTitle className="text-primary">Chat</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ScrollArea className="h-[200px] mb-4">
                                  <div className="space-y-4">
                                    {event.messages.map((message: any) => (
                                      <div key={message.id} className="flex gap-2">
                                        <Avatar className="border-2 border-primary">
                                          <AvatarImage src="/placeholder-user.jpg" />
                                          <AvatarFallback className="bg-primary text-primary-foreground">{message.sender.username[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-muted p-2 rounded-lg">
                                          <p className="font-semibold text-primary">{message.sender.username}</p>
                                          <p>{message.content}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </ScrollArea>
                                <form onSubmit={(e) => {
                                  e.preventDefault()
                                  handleSendMessage(event.id)
                                }} className="flex gap-2">
                                  <Input
                                    placeholder="Nachricht schreiben..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="border-primary"
                                  />
                                  <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </form>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="past">
                <div className="space-y-4">
                  {events.filter((event: any) => new Date(event.date) < new Date()).map((event: any) => (
                    <div key={event.id} className="flex justify-between items-center p-4 hover:bg-muted rounded-lg transition-colors duration-200 ease-in-out bg-[hsl(var(--event-3))] text-white">
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm opacity-90">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <Button variant="secondary">Details</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Freunde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Freunde suchen" className="pl-8 border-primary" />
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {friends.map((friendship: any) => (
                  <div key={friendship.id} className="flex items-center justify-between bg-muted p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Avatar className="border-2 border-primary">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-primary text-primary-foreground">{friendship.friend.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-primary">{friendship.friend.username}</p>
                        <p className="text-sm text-muted-foreground">Online</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary hover:text-primary-foreground">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Aktivitäten</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {activities.map((activity: any, index: number) => (
                  <div key={index} className="flex items-start gap-2 bg-muted p-2 rounded-lg">
                    <Avatar className="border-2 border-primary">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-primary text-primary-foreground">{activity.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>
                        <span className="font-semibold text-primary">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

