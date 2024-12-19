'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [newPacklistItem, setNewPacklistItem] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const handleAddPacklistItem = (e: React.FormEvent) => {
    e.preventDefault()
    // Hier würde normalerweise der neue Eintrag zur Packliste hinzugefügt werden
    setNewPacklistItem('')
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // Hier würde normalerweise die Nachricht gesendet werden
    setNewMessage('')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Willkommen zurück, Max!</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Neues Event erstellen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Neues Event erstellen</DialogTitle>
              <DialogDescription>
                Fülle die Details für dein neues Event aus.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Event Name</Label>
                <Input id="name" placeholder="z.B. Wochenendtrip nach Berlin" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  placeholder="Beschreibe dein Event..."
                />
              </div>
              <div className="grid gap-2">
                <Label>Datum</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div className="grid gap-2">
                <Label>Ort</Label>
                <Input placeholder="z.B. Berlin" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Event erstellen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Deine Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Bevorstehend</TabsTrigger>
                <TabsTrigger value="past">Vergangen</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <div className="space-y-4">
                  <Collapsible
                    open={expandedEvent === 'berlin'}
                    onOpenChange={() => setExpandedEvent(expandedEvent === 'berlin' ? null : 'berlin')}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex justify-between items-center p-4 hover:bg-muted rounded-lg">
                        <div>
                          <h3 className="font-semibold">Wochenendtrip nach Berlin</h3>
                          <p className="text-sm text-muted-foreground">15. - 17. Juli 2023</p>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardTitle>Teilnehmer</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                <Avatar>
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>M</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" size="sm">
                                  <PlusCircle className="h-4 w-4 mr-2" />
                                  Einladen
                                </Button>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Fotos & Videos</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-3 gap-2">
                                <img
                                  src="/placeholder.svg?height=100&width=100"
                                  alt="Event photo"
                                  className="rounded-lg"
                                />
                                <img
                                  src="/placeholder.svg?height=100&width=100"
                                  alt="Event photo"
                                  className="rounded-lg"
                                />
                                <Button variant="outline" className="flex flex-col items-center justify-center h-[100px]">
                                  <Camera className="h-8 w-8 mb-2" />
                                  <span className="text-xs">Hochladen</span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Packliste</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <form onSubmit={handleAddPacklistItem} className="flex gap-2 mb-4">
                                <Input
                                  placeholder="Neuer Eintrag..."
                                  value={newPacklistItem}
                                  onChange={(e) => setNewPacklistItem(e.target.value)}
                                />
                                <Button type="submit" size="sm">
                                  <PlusCircle className="h-4 w-4" />
                                </Button>
                              </form>
                              <ScrollArea className="h-[200px]">
                                <div className="space-y-2">
                                  {['Kleidung für 3 Tage', 'Zahnbürste', 'Kamera', 'Powerbank'].map((item) => (
                                    <div key={item} className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm">
                                          <Check className="h-4 w-4" />
                                        </Button>
                                        <span>{item}</span>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Chat</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-[200px] mb-4">
                                <div className="space-y-4">
                                  <div className="flex gap-2">
                                    <Avatar>
                                      <AvatarImage src="/placeholder-user.jpg" />
                                      <AvatarFallback>M</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted p-2 rounded-lg">
                                      <p className="font-semibold">Max</p>
                                      <p>Ich freue mich schon sehr auf den Trip!</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Avatar>
                                      <AvatarImage src="/placeholder-user.jpg" />
                                      <AvatarFallback>A</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted p-2 rounded-lg">
                                      <p className="font-semibold">Anna</p>
                                      <p>Sollen wir uns am Bahnhof treffen?</p>
                                    </div>
                                  </div>
                                </div>
                              </ScrollArea>
                              <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                  placeholder="Nachricht schreiben..."
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <Button type="submit" size="icon">
                                  <Send className="h-4 w-4" />
                                </Button>
                              </form>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex justify-between items-center p-4 hover:bg-muted rounded-lg">
                        <div>
                          <h3 className="font-semibold">Grillparty</h3>
                          <p className="text-sm text-muted-foreground">22. Juli 2023</p>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </CollapsibleTrigger>
                  </Collapsible>
                </div>
              </TabsContent>
              <TabsContent value="past">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 hover:bg-muted rounded-lg">
                    <div>
                      <h3 className="font-semibold">Konzertbesuch</h3>
                      <p className="text-sm text-muted-foreground">5. Juni 2023</p>
                    </div>
                    <Button variant="outline">Details</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Freunde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Freunde suchen" className="pl-8" />
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {['Anna Schmidt', 'Tom Müller', 'Lisa Weber', 'Mark Klein'].map((friend) => (
                  <div key={friend} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{friend[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{friend}</p>
                        <p className="text-sm text-muted-foreground">Online</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktivitäten</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {[
                  { user: 'Anna', action: 'hat dich zum Event "Strandtag" eingeladen', time: 'Vor 2 Stunden' },
                  { user: 'Tom', action: 'hat ein neues Foto hochgeladen', time: 'Vor 3 Stunden' },
                  { user: 'Lisa', action: 'hat dem Event "Grillparty" zugesagt', time: 'Vor 5 Stunden' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>{activity.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>
                        <span className="font-semibold">{activity.user}</span> {activity.action}
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

