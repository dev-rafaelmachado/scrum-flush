import { Card } from '@/components/Card'

export default function Home() {
  return (
    <main className="flex items-center justify-center w-full h-full gap-4">
      <Card value="3" />
      <Card value="5" />
      <Card value="8" />
      <Card value="13" />
      <Card value="21" />
      <Card value="34" />
      <Card value="55" />
      <Card value="89" />
      <Card value="144" />
    </main>
  )
}
