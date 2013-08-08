<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace JavisERP\System;

use Symfony\Component\Security\Core\User\UserInterface;
/**
 * User is the user implementation used by the in-memory user provider.
 *
 * This should not be used for anything else.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 */
final class User implements UserInterface
{
    private $username;
    private $password;
    private $newpassword;
    private $enabled;
    private $id;
    private $managerId;
    private $firstName;
    private $lastName;
    private $email;
    private $accountNonExpired;
    private $credentialsNonExpired;
    private $accountNonLocked;
    private $roles;
    private $resources;

    public function __construct($id, $username, $password, $newpassword, $email, $managerId, $firstName, $lastName, array $resources = array(), $enabled = true, $userNonExpired = true, $credentialsNonExpired = true, $userNonLocked = true)
    {
        if (empty($username)) {
            throw new \InvalidArgumentException('The username cannot be empty.');
        }

        $this->username = $username;
        $this->password = $password;
        $this->newpassword = $newpassword;
        $this->enabled = $enabled;
        $this->accountNonExpired = $userNonExpired;
        $this->credentialsNonExpired = $credentialsNonExpired;
        $this->accountNonLocked = $userNonLocked;
        $this->roles = array(); //$roles;
        $this->resources = $resources;
        $this->id = $id;
        $this->managerId = $managerId;
        $this->email = $email;
        $this->firstName = $firstName;
        $this->lastName = $lastName;

    }

    /**
     * {@inheritdoc}
     */
    public function getRoles()
    {
        return $this->roles;
    }
    
    /**
     * {@inheritdoc}
     */
    public function getResources()
    {
        return $this->resources;
    }
    
    /**
     * {@inheritdoc}
     */
    public function getNewPassword()
    {
        return $this->newpassword;
    }

    /**
     * {@inheritdoc}
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * {@inheritdoc}
     */
    public function isAccountNonExpired()
    {
        return $this->accountNonExpired;
    }

    /**
     * {@inheritdoc}
     */
    public function isAccountNonLocked()
    {
        return $this->accountNonLocked;
    }

    /**
     * {@inheritdoc}
     */
    public function isCredentialsNonExpired()
    {
        return $this->credentialsNonExpired;
    }

    /**
     * {@inheritdoc}
     */
    public function isEnabled()
    {
        return $this->enabled;
    }

    /**
     * {@inheritdoc}
     */
    public function eraseCredentials()
    {
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * {@inheritdoc}
     */
    public function getManagerId()
    {
        return $this->managerId;
    }
    /**
     * {@inheritdoc}
     */
    public function getTerritoryId()
    {
        return $this->territoryId;
    }
    /**
     * {@inheritdoc}
     */
    public function getFirstName()
    {
        return $this->firstName;
    }
    /**
     * {@inheritdoc}
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * {@inheritdoc}
     */
    public function getEmail()
    {
        return $this->email;
    }
}
