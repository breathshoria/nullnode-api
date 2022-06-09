import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title: string;

    @Column()
    startDate: string;

    @Column({ default: true })
    onGoing: boolean;

    @Column()
    description: string;
}