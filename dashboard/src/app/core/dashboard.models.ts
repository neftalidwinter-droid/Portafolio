import { ChartConfiguration, ChartType } from "chart.js";

export interface StatCard {
    icon: string; // nombre del icono de Material
    color: 'orange' | 'green' | 'red' | 'cyan';
    label: string;
    value: string;
    footerIcon: string;
    footerText: string;
}

export interface ChartCardInfo {
    title: string;
    subtitle: string;
    footer: string;
    color: 'green' | 'orange' | 'red';
    type: ChartType;
    data: ChartConfiguration['data'];
}

export interface Tarea { texto: string; hecha: boolean; }

export interface TaskTab {
    id: string;
    label: string;
    icon: string;
    tareas: Tarea[];
}

export interface Employee {
    id: number;
    nombre: string;
    salario: string;
    pais: string;
    ciudad: string;
}
