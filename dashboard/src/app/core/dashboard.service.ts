import { Injectable } from '@angular/core';
import { StatCard, ChartCardInfo, TaskTab, Employee } from './dashboard.models';

@Injectable({ providedIn: 'root' })
    export class DashboardService {

    getStats(): StatCard[] {
        return [
            { icon: 'content_copy', color: 'orange', label: 'Espacio usado', value: '49/50 GB', footerIcon: 'warning', footerText: 'Obtener más espacio' },
            { icon: 'store', color: 'green', label: 'Ingresos', value: '$34,245', footerIcon: 'date_range', footerText: 'Últimas 24 horas' },
            { icon: 'info_outline', color: 'red', label: 'Problemas resueltos', value: '75', footerIcon: 'local_offer', footerText: 'Seguimiento en GitHub' },
            { icon: 'group', color: 'cyan', label: 'Seguidores', value: '+245', footerIcon: 'update', footerText: 'Actualizado hace un momento' },
        ];
    }

    getCharts(): ChartCardInfo[] {
        const linea = {
        borderColor: '#fff', backgroundColor: '#fff', pointBackgroundColor: '#fff',
        borderWidth: 2, tension: 0,
        };
        return [
            {
                title: 'Ventas diarias', subtitle: '+55% más ventas hoy.',
                footer: 'actualizado hace 4 minutos', color: 'green', type: 'line',
                data: {
                    labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
                    datasets: [{ data: [12, 17, 7, 17, 23, 18, 38], ...linea }],
                },
            },
            {
                title: 'Suscripciones por correo', subtitle: 'Rendimiento de la última campaña',
                footer: 'campaña enviada hace 2 días', color: 'orange', type: 'bar',
                data: {
                    labels: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                    datasets: [{
                        data: [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                        backgroundColor: 'rgba(255,255,255,.85)',
                    }],
                },
            },
            {
                title: 'Tareas completadas', subtitle: 'Rendimiento de la última campaña',
                footer: 'campaña enviada hace 2 días', color: 'red', type: 'line',
                data: {
                    labels: ['12a', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
                    datasets: [{ data: [230, 750, 450, 300, 280, 240, 200, 190], ...linea }],
                },
            },
        ];
    }

    getTaskTabs(): TaskTab[] {
        return [
            { id: 'bugs', label: 'Bugs', icon: 'bug_report', tareas: [
                { texto: 'Corregir el filtro de fechas', hecha: true },
                { texto: 'Revisar el error 500 al guardar', hecha: false },
                { texto: 'Pruebas del módulo de reportes', hecha: false },
            ]},
            { id: 'web', label: 'Sitio web', icon: 'code', tareas: [
                { texto: 'Actualizar la página de inicio', hecha: false },
                { texto: 'Optimizar imágenes', hecha: true },
            ]},
            { id: 'srv', label: 'Servidor', icon: 'cloud', tareas: [
                { texto: 'Renovar certificado SSL', hecha: false },
                { texto: 'Respaldo semanal de la base de datos', hecha: true },
            ]},
        ];
    }

    getEmployees(): Employee[] {
        return [
            { id: 1, nombre: 'Dakota Rice', salario: '$36,738', pais: 'Niger', ciudad: 'Oud-Turnhout' },
            { id: 2, nombre: 'Minerva Hooper', salario: '$23,789', pais: 'Curazao', ciudad: 'Sinaai-Waas' },
            { id: 3, nombre: 'Sage Rodriguez', salario: '$56,142', pais: 'Países Bajos', ciudad: 'Baileux' },
            { id: 4, nombre: 'Philip Chaney', salario: '$38,735', pais: 'Corea del Sur', ciudad: 'Overland Park' },
        ];
    }
}
