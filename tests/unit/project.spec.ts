import { Project } from '@/primitives/project';

describe('Project', () => {
    it('instantiates', () => {
        const project = new Project({});
        expect(project).toHaveProperty('name', 'New Project');
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('created'); // we'll want to check these are sane at some point
        expect(project).toHaveProperty('modified'); // we'll want to check these are sane at some point
        expect(project).toHaveProperty('notes', '');
        expect(project).toHaveProperty('tiles', []);
        expect(project).toHaveProperty('paletteSet', '');
    });
});
