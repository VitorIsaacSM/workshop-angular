import { Component, OnInit } from '@angular/core';
import { TarefaService } from './tarefa.service';

interface Tarefa {
  description: string;
  index: number;
  isDone: boolean;
  limit: Date;
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tarefas: Tarefa[];

  constructor(private tarefaSerivce: TarefaService) { }

  ngOnInit() {
    this.tarefaSerivce.getTarefas().subscribe((tarefas: Tarefa[]) => this.tarefas = tarefas);
  }

}
