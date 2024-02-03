import Image from "next/image";
import { Constants } from "@/configs";
import { Map } from "@/components/google-map";
import 'mapbox-gl/dist/mapbox-gl.css';
import { WeatherComponent } from "@/components";

export default function Home() {
  return (
    <main className="py-12">
      <WeatherComponent.Weather />
      <Map />
    </main>
  );
}
