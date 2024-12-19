'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventPage({ params }: { params: { id: string } }) {
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' })

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Hier würden Sie normalerweise die neue Ausgabe zur Liste hinzufügen
    console.log('Neue Ausgabe:', newExpense)
    setNewExpense({ description: '', amount: '' })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Wochenendtrip nach Berlin</h1>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="participants">Teilnehmer</TabsTrigger>
          <TabsTrigger value="expenses">Ausgaben</TabsTrigger>
          <TabsTrigger value="photos">Fotos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>15. - 17. Juli 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Wir fahren für ein Wochenende nach Berlin! Hier sind die wichtigsten Infos:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Treffpunkt: Hauptbahnhof, 15. Juli um 8:00 Uhr</li>
                <li>Unterkunft: AirBnB in Mitte</li>
                <li>Geplante Aktivitäten: Stadtführung, Museumsbesuch, Bootstour</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Teilnehmer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="@user1" />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Max Mustermann (Organisator)</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="@user2" />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Anna Schmidt</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="@user3" />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Tom Müller</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Ausgaben</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex justify-between">
                  <span>AirBnB Unterkunft</span>
                  <span>300 €</span>
                </li>
                <li className="flex justify-between">
                  <span>Zugtickets</span>
                  <span>150 €</span>
                </li>
                <li className="flex justify-between">
                  <span>Stadtführung</span>
                  <span>60 €</span>
                </li>
              </ul>
              <form onSubmit={handleExpenseSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Input 
                    id="description" 
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Betrag (€)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  />
                </div>
                <Button type="submit">Ausgabe hinzufügen</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Fotoalbum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <img src="/placeholder.svg?height=100&width=100" alt="Event photo 1" className="rounded" />
                <img src="/placeholder.svg?height=100&width=100" alt="Event photo 2" className="rounded" />
                <img src="/placeholder.svg?height=100&width=100" alt="Event photo 3" className="rounded" />
                <img src="/placeholder.svg?height=100&width=100" alt="Event photo 4" className="rounded" />
                <img src="/placeholder.svg?height=100&width=100" alt="Event photo 5" className="rounded" />
                <img src="/placeholder.svg?height=100&width=100" alt="Event photo 6" className="rounded" />
              </div>
              <Button className="mt-4">Fotos hochladen</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

