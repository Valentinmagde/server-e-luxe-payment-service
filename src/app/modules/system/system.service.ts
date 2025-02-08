import System from "./system.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-13
 *
 * Class SystemService
 */
class SystemService {
  /**
   * Get system details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {string} systemId the system id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getSystemById(systemId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const system = await System.findById(systemId);

          resolve(system);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get system details by name handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-14
   *
   * @param {any} name the system name
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async getSystemByName(
    name: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const system = await System.findOne({name: name});

          resolve(system);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all systems
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getSystems(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const systems = await System.find();

          resolve(systems);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new system
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {any} data the system data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const system = new System(data);

          const createdSystem = await system.save();

          resolve(createdSystem);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a system
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {string} systemId the systemid
   * @param {any} data the system data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(systemId: string, data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const system = await System.findById(systemId);

          if (system) {
            system.name = data.name || system.name;
            system.description =
              data.description || system.description;

            const updatedSystem = await system.save();

            resolve(updatedSystem);
          } else {
            resolve(system);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a system by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {string} systemId the system id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(systemId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const system = await System.findById(systemId);

          if (system) {
            const deletedSystem = await System.deleteOne();

            resolve(deletedSystem);
          } else {
            resolve(system);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const systemService = new SystemService();
export default systemService;