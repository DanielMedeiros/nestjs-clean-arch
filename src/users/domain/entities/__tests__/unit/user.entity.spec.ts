import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '../testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
    let props: UserProps;
    let sut: UserEntity;

    beforeEach(() => {
        props = UserDataBuilder({});
        sut = new UserEntity(props);
    });

    it('Constructor method', () => {
        expect(sut.props.name).toEqual(props.name);
        expect(sut.props.email).toEqual(props.email);
        expect(sut.props.password).toEqual(props.password);
        expect(sut.props.createdAt).toBeInstanceOf(Date);
    });

    it('Getter of name field', () => {
        expect(sut.name).toBeDefined();
        expect(sut.name).toEqual(props.name);
        expect(typeof sut.name).toBe('string');
    });

    it('Getter of email field', () => {
        expect(sut.email).toBeDefined();
        expect(sut.email).toEqual(props.email);
        expect(typeof sut.email).toBe('string');
    });

    it('Getter of password field', () => {
        expect(sut.password).toBeDefined();
        expect(sut.password).toEqual(props.password);
        expect(typeof sut.password).toBe('string');
    });

    it('Getter of createdAt field', () => {
        expect(sut.createdAt).toBeDefined();
        expect(sut.createdAt).toBeInstanceOf(Date);
    });

    it('Should create a new user with createdAt date if not provided', () => {
        const customProps = UserDataBuilder({});
        const user = new UserEntity(customProps);

        expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('Should create a new user with provided createdAt date', () => {
        const customDate = new Date('2023-01-01');
        const customProps = UserDataBuilder({ createdAt: customDate });
        const user = new UserEntity(customProps);

        expect(user.createdAt).toEqual(customDate);
    });
});
