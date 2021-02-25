import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeliculasService } from "../../services/peliculas.service";

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  idPelicula = '';
  titulo = '';
  pelicula: any = {};
  urlFondo: string;
  credits: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
    private peliculasService: PeliculasService) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.idPelicula = params.id;
      this.titulo = params.titulo;
      this.peliculasService
        .getPelicula(this.idPelicula)
        .subscribe((data: any) => {
          this.pelicula = data;
          this.urlFondo =
            "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
            this.pelicula.backdrop_path;
            console.log(this.pelicula);
        }),
        (error: any) => {
          console.log(error);
        };
        this.peliculasService.getCredits(this.idPelicula).subscribe((data:any) => {
          this.credits = data;
          console.log(data);
        });
    });
  }

}
