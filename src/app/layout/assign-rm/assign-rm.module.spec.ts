import { AssignRmModule } from './assign-rm.module';

describe('DashboardModule', () => {
    let assignRmModule: AssignRmModule;

    beforeEach(() => {
        assignRmModule = new AssignRmModule();
    });

    it('should create an instance', () => {
        expect(assignRmModule).toBeTruthy();
    });
});
