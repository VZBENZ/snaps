import type { OnNameLookupHandler } from '@metamask/snaps-types';
import { numberToHex } from '@metamask/utils';

/**
 * Handle incoming name lookup requests from the MetaMask clients.
 *
 * @param request - The request arguments.
 * @param request.domain - The domain to resolve. Will be undefined if an address is provided.
 * @param request.address - The address to resolve. Will be undefined if a domain is provided.
 * @param request.chainId - The CAIP-2 chain ID of the associated network.
 * @returns If successful, an object containing the resolvedDomain or resolvedAddress. Null otherwise.
 * @see https://docs.metamask.io/snaps/reference/exports/#onnamelookup
 */
export const onNameLookup: OnNameLookupHandler = async (request) => {
  const { chainId, address, domain } = request;

  if (address) {
    const shortAddress = `0x${address.substring(2, 5)}`;
    const chainIdDecimal = parseInt(chainId.split(':')[1], 10);
    const chainIdHex = numberToHex(chainIdDecimal);
    const resolvedDomain = `example.domain - ${shortAddress} / ${chainIdHex}`;
    return { resolvedDomain };
  }

  if (domain) {
    const resolvedAddress = '0xc0ffee254729296a45a3885639AC7E10F9d54979';
    return { resolvedAddress };
  }

  return null;
};
