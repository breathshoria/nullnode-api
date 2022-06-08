import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column()
    startDate: string;

    @Column({ default: true })
    onGoing: boolean;

    @Column()
    description: string;
}