'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Friendspace</CardTitle>
          <CardDescription>Verbinde dich mit deinen Freunden</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registrieren</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                  <Label htmlFor="password">Passwort</Label>
                  <Input id="password" type="password" />
                  <Button className="mt-2" type="submit" disabled={isLoading}>
                    {isLoading ? "Lädt..." : "Einloggen"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" />
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                  <Label htmlFor="password">Passwort</Label>
                  <Input id="password" type="password" />
                  <Button className="mt-2" type="submit" disabled={isLoading}>
                    {isLoading ? "Lädt..." : "Registrieren"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


export {LoginPage}

